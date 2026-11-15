#!/bin/sh
# PreToolUse for Bash, Skill, request_file_upload and complete_file_upload: let through, without a prompt, only takepilot's own skill and its helper's fixed steps
# (ENGR-2905, 17-25-chat-for-marketers.md). Anything it cannot read exactly gets no answer, so the normal prompt shows.
input=$(cat)
allow() {
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"allow","permissionDecisionReason":"%s"}}\n' "$1"
  exit 0
}

case "$input" in
  *'"tool_name":"Skill"'*)
    case "$input" in
      *'"tool_input":{"skill":"takepilot:'*) allow "takepilot の手順を読みます" ;;
    esac
    exit 0
    ;;
esac

# uploads: only a plain file. One aimed at a 商材 (or a competitor, ENGR-2996) changes what later videos use: the person is asked. request_file_upload keeps
# the 商材 for its complete_file_upload, so asking there covers a complete_file_upload that names none.
case "$input" in
  *'"tool_name":"mcp__'*'__complete_file_upload"'* | *'"tool_name":"mcp__'*'__request_file_upload"'*)
    case "$input" in
      *'"product_id"'* | *'"competitor_id"'* | *'"target_cv_id"'*) exit 0 ;;
    esac
    allow "ファイルを受け取る準備をします"
    ;;
esac

# the command, exactly as the JSON holds it, in any key order (a raw `"command":"` cannot occur inside a JSON string)
cmd=$(printf '%s' "$input" | sed -nE 's/.*"tool_input":\{(.*"command"|"command"):"(([^"\\]|\\.)*)".*/\2/p')
[ -n "$cmd" ] || exit 0
[ -n "${CLAUDE_PLUGIN_ROOT:-}" ] || exit 0
prefix="bash \\\"${CLAUDE_PLUGIN_ROOT}/skills/takepilot-ad/scripts/takepilot-files\\\" "
case "$cmd" in
  "$prefix"*) rest=${cmd#"$prefix"} ;;
  *) exit 0 ;;
esac
# the arguments may be double-quoted. Past that: no shell at all (no second command, substitution, redirect, escape, glob, or a path going up)
args=$(printf '%s' "$rest" | sed 's/\\"//g')
case "$args" in
  *[\;\|\&\$\`\<\>\(\)\{\}\\\'\*\?\!\#\[\]~^=]* | *..*) exit 0 ;;
esac
# set the words without the shell reading them again: the check above left no metacharacters
# shellcheck disable=SC2086
set -- $args
sub=${1:-}
case "$sub" in
  pc) [ $# -eq 1 ] && allow "この PC の空きを調べます" ;;
  save) [ $# -eq 3 ] && allow "動画を保存します" ;;
  frames) [ $# -eq 2 ] && allow "動画のコマを切り出します" ;;
  sheet) [ $# -eq 2 ] && allow "動画のコマをタイルにします" ;;
  pack) [ $# -eq 2 ] && allow "直した動画をまとめます" ;;
esac
# takeout, render, send and image always ask (image opens a URL from another site's page, ENGR-2945): takeout unpacks whatever zip the link opens (the hook cannot tell the person's own bundle
# from a link in another person's text; ENGR-2927), render runs a page in a browser, send moves a file off this computer (a link
# in another person's text could name their workspace). ^ and = are refused above too: zsh expands them (EXTENDED_GLOB, EQUALS)
exit 0
