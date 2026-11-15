#!/usr/bin/env node
// hyperframes.mjs: run takepilot's build of the HyperFrames CLI on the person's own PC, for a free local render
// (ENGR-2832; get_playbook editing §6). npm's `hyperframes` is upstream's and lacks takepilot's patches (effects,
// isolation of another author's scripts, failing on a picture that did not load), so takepilot builds the CLI from its
// own copy at the version its cloud renderer uses and publishes it as a Release asset of TakePilot/takepilot-plugin.
//
//   node hyperframes.mjs <hyperframes arguments>     e.g. browser ensure | doctor | render <folder> --fps 30 ...
//   node hyperframes.mjs --takepilot-build           prints this build (pass it as get_video_bundle's cli)
//   node hyperframes.mjs takepilot-render --media <file> <render arguments>
//                                                    renders the server's bundle with the real files that
//                                                    get_local_render_media's answer (saved as <file>) names, in a folder it
//                                                    deletes afterwards, and prints the mp4's path (ENGR-3169: a 3D video from
//                                                    another person's template; the folder the person edits keeps its stand-ins)
//
// The first run downloads the tarball, checks its SHA-256 against the one below (a mismatch stops, nothing installed),
// and installs it with npm into ~/.takepilot/hyperframes/<version>/ (never globally; --ignore-scripts; dependencies
// pinned by the tarball's npm-shrinkwrap.json). Later runs use that folder. Upstream's update check, auto-install and
// telemetry are switched off, so nothing replaces this build with npm's upstream one.
// Needs Node.js 22+ and npm. Exit codes: the CLI's own, or 3 the download did not match the SHA-256, 4 the download or
// the install failed, 5 Node.js too old, 6 takepilot-render on Linux.
// TAKEPILOT_HYPERFRAMES_TARBALL=<path> installs from a local copy of the same tarball instead (still SHA-256 checked).
import { spawnSync } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, isAbsolute, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateRawSync } from "node:zlib";

// Keep in step with hyperframesCLI in takepilot's server (scripts/plugin checks they agree).
const VERSION = "0.8.174-tp.1";
const URL =
  "https://github.com/TakePilot/takepilot-plugin/releases/download/hyperframes-cli-v0.8.174-tp.1/takepilot-hyperframes-0.8.174-tp.1.tgz";
const SHA256 = "33e4efe48375d98ef46b65d1da84ff2838464e6aa67dd1791de2aaeff3cb2bd9";

const MARK = ".takepilot-ok";

function fail(code, msg) {
  process.stderr.write(`hyperframes.mjs: ${msg}\n`);
  process.exit(code);
}

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

async function fetchTarball() {
  const local = process.env.TAKEPILOT_HYPERFRAMES_TARBALL;
  if (local) return readFileSync(local);
  const res = await fetch(URL, { redirect: "follow" });
  if (!res.ok) throw new Error(`download ${URL}: HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

/** npm without a shell where it can be: Windows' npm.cmd needs one, and a shell splits a home folder with a space. */
function npmCommand(args) {
  if (process.platform !== "win32") return ["npm", args, false];
  const cli = join(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js");
  if (existsSync(cli)) return [process.execPath, [cli, ...args], false];
  return ["npm.cmd", args.map((a) => `"${a}"`), true];
}

async function install(dir) {
  let tgz;
  try {
    tgz = await fetchTarball();
  } catch (err) {
    fail(4, `${err.message}. Tell the person; ask before rendering in the cloud instead.`);
  }
  const got = sha256(tgz);
  if (got !== SHA256) {
    fail(3, `the download's SHA-256 is ${got}, not ${SHA256}: not installed. Tell the person; do not run another CLI.`);
  }
  // install into a fresh folder, then move it into place: a half-done install is never taken for a finished one
  const tmp = `${dir}.tmp-${randomBytes(6).toString("hex")}`;
  mkdirSync(tmp, { recursive: true, mode: 0o700 });
  const file = join(tmp, `takepilot-hyperframes-${VERSION}.tgz`);
  writeFileSync(file, tgz);
  writeFileSync(join(tmp, "package.json"), '{"private":true}\n');
  const [cmd, args, shell] = npmCommand([
    "install", "--prefix", tmp, "--ignore-scripts", "--omit=dev", "--no-audit", "--no-fund", "--no-save", file,
  ]);
  const r = spawnSync(cmd, args, {
    stdio: ["ignore", "inherit", "inherit"],
    shell,
    env: { ...process.env, npm_config_update_notifier: "false" },
  });
  if (r.status !== 0) {
    rmSync(tmp, { recursive: true, force: true });
    fail(4, `npm install failed (${r.error?.message ?? `exit ${r.status}`}). Tell the person; ask before rendering in the cloud instead.`);
  }
  writeFileSync(join(tmp, MARK), `${SHA256}\n`);
  rmSync(dir, { recursive: true, force: true });
  renameSync(tmp, dir);
}

/** The installed CLI's entry and the environment it runs with (installing it first when needed). */
async function ensureCLI() {
  const major = Number(process.versions.node.split(".")[0]);
  if (major < 22) fail(5, `Node.js ${process.versions.node} is too old: 22 or newer is needed.`);
  const env = {
    ...process.env,
    HYPERFRAMES_NO_UPDATE_CHECK: "1",
    HYPERFRAMES_NO_AUTO_INSTALL: "1",
    HYPERFRAMES_NO_TELEMETRY: "1",
  };
  // the tests' stand-in for the CLI: only for a copy of this script with the tests' mark beside it (never shipped)
  if (testHooks() && process.env.TAKEPILOT_HYPERFRAMES_BIN_FOR_TEST) return { bin: process.env.TAKEPILOT_HYPERFRAMES_BIN_FOR_TEST, env };
  const dir = join(homedir(), ".takepilot", "hyperframes", VERSION);
  const mark = join(dir, MARK);
  if (!existsSync(mark) || readFileSync(mark, "utf8").trim() !== SHA256) {
    mkdirSync(join(homedir(), ".takepilot", "hyperframes"), { recursive: true, mode: 0o700 });
    await install(dir);
  }
  const bin = join(dir, "node_modules", "hyperframes", "bin", "hyperframes.mjs");
  if (!existsSync(bin)) fail(4, `${bin} is missing: delete ${dir} and run again.`);
  return { bin, env };
}

const RENDER_TMP = join(homedir(), ".takepilot", "render-tmp");
const STALE_MS = 60 * 60 * 1000; // a render folder older than this was left by a run that was killed
// the render arguments takepilot-render passes on (anything else could change where or how the CLI renders)
const RENDER_ARGS = new Map([["--fps", /^(24|30|60)$/], ["--quality", /^(draft|standard|high)$/], ["--format", /^mp4$/]]);

/** Says the run whose pid the file holds is still running (a folder with no pid file is a killed run's). */
function alive(pidFile) {
  try {
    process.kill(Number(readFileSync(pidFile, "utf8").trim()), 0);
    return true;
  } catch (err) {
    return err?.code === "EPERM"; // running, as another user
  }
}

/** The tests' hooks work only in a copy of this script with their mark beside it: the plugin never ships one. */
function testHooks() {
  return existsSync(join(dirname(fileURLToPath(import.meta.url)), ".takepilot-test-hooks"));
}

/** The render arguments, each --k v or --k=v of RENDER_ARGS, or null when any is something else. */
function renderArgs(args) {
  const out = [];
  for (let i = 0; i < args.length; i++) {
    let [k, v] = args[i].split(/=(.*)/s, 2);
    if (v === undefined) v = args[++i];
    const ok = RENDER_ARGS.get(k);
    if (!ok || typeof v !== "string" || !ok.test(v)) return null;
    out.push(k, v);
  }
  return out;
}
const RENDERS = join(homedir(), ".takepilot", "renders");
// the engine's own test for the isolation mark (isIsolatedHtml in takepilotIsolation.ts; the server's isolatedPageRe)
const ISOLATED = /<meta\b[^>]*\bname\s*=\s*["']?takepilot-isolated["']?[^>]*>/i;

/** A file's path in the bundle or from the server: relative, no way out of the folder it goes in. */
function safeRelPath(p) {
  if (typeof p !== "string" || p === "" || p.includes("\\") || p.includes("\0") || isAbsolute(p)) return false;
  return !p.split("/").some((part) => part === ".." || part === "." || part === "");
}

/** The entries of a zip (stored or deflated), read through its central directory, each written under dir. */
function unzipInto(buf, dir) {
  const end = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (end < 0) throw new Error("the bundle is not a zip");
  const count = buf.readUInt16LE(end + 10);
  let p = buf.readUInt32LE(end + 16);
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error("the bundle's directory does not read");
    const method = buf.readUInt16LE(p + 10);
    const packed = buf.readUInt32LE(p + 20);
    const size = buf.readUInt32LE(p + 24);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.subarray(p + 46, p + 46 + nameLen).toString("utf8");
    p += 46 + nameLen + extraLen + commentLen;
    if (name.endsWith("/")) continue;
    if (!safeRelPath(name)) throw new Error(`the bundle names ${name.slice(0, 80)}`);
    const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const raw = buf.subarray(start, start + packed);
    let data;
    if (method === 0) data = raw;
    else if (method === 8) data = inflateRawSync(raw);
    else throw new Error(`the bundle's ${name} is packed in a way this script does not read`);
    if (data.length !== size) throw new Error(`the bundle's ${name} does not read whole`);
    const dest = resolve(dir, name);
    if (!dest.startsWith(dir + sep)) throw new Error(`${name} leaves the folder`);
    mkdirSync(dirname(dest), { recursive: true, mode: 0o700 });
    writeFileSync(dest, data, { mode: 0o600 });
  }
}

async function download(url, what) {
  const res = await fetch(url, { redirect: "error" });
  if (!res.ok) throw new Error(`${what}: HTTP ${res.status} (the links last 15 minutes: call get_local_render_media again)`);
  return Buffer.from(await res.arrayBuffer());
}

/**
 * takepilot-render: the server's bundle of the version (its stand-ins, the page with its isolation mark) and the real
 * files of get_local_render_media go into a fresh folder under ~/.takepilot/render-tmp/ (only this user may read it),
 * the CLI renders it, the mp4 goes to ~/.takepilot/renders/, and the folder and the answer's file are deleted whatever
 * happens. The folder the person edits (and opens in HyperFrames Studio) is never read and never gets a real file or the
 * mp4 (ENGR-3169, 24-10-author-3d-local-render.md).
 */
async function takepilotRender(args) {
  const at = args.indexOf("--media");
  if (at < 0 || !args[at + 1]) fail(2, "usage: takepilot-render --media <get_local_render_media's answer as a file> <render arguments>");
  const mediaFile = args[at + 1];
  // the answer (signed links to the real files) is read and deleted at once: it never stays on disk past this line. A
  // file that is not such an answer is left alone (it may be one of the person's)
  let media;
  try {
    media = JSON.parse(readFileSync(mediaFile, "utf8"));
  } catch (err) {
    fail(2, `${mediaFile} is not get_local_render_media's answer: ${err.message}`);
  }
  if (typeof media?.bundle_url !== "string" || !Array.isArray(media?.files)) {
    fail(2, `${mediaFile} is not get_local_render_media's answer (no bundle_url and files).`);
  }
  rmSync(mediaFile, { force: true });
  const done = fail;
  const rest = renderArgs([...args.slice(0, at), ...args.slice(at + 2)]);
  if (!rest) done(2, "takepilot-render takes only --fps, --quality and --format (it writes the mp4 itself, under ~/.takepilot/renders/).");
  if (process.platform === "linux" && !(testHooks() && process.env.TAKEPILOT_RENDER_LINUX_FOR_TEST === "1")) {
    done(6, "this video renders only on macOS or Windows (its Chrome has no sandbox on Linux here): tell the person and suggest a Mac or Windows PC.");
  }
  const allowHTTP = testHooks() && process.env.TAKEPILOT_MEDIA_HTTP_FOR_TEST === "1";
  const okURL = (u) => typeof u === "string" && (u.startsWith("https://") || (allowHTTP && u.startsWith("http://")));
  const files = Array.isArray(media?.files) ? media.files : [];
  if (!okURL(media?.bundle_url)) done(2, `${mediaFile} has no bundle_url from takepilot: nothing rendered.`);
  for (const f of files) {
    if (!okURL(f?.url) || !safeRelPath(f?.path) || !f.path.startsWith("assets/")) {
      done(2, `a file in ${mediaFile} is not one takepilot names (${String(f?.path).slice(0, 80)}): nothing rendered.`);
    }
  }
  const { bin, env } = await ensureCLI();
  // what a run that was killed left: real files never stay past the next run (a render running now is younger)
  mkdirSync(RENDER_TMP, { recursive: true, mode: 0o700 });
  for (const name of readdirSync(RENDER_TMP)) {
    const p = join(RENDER_TMP, name);
    try {
      if (Date.now() - statSync(p).mtimeMs > STALE_MS && !alive(join(p, "pid"))) rmSync(p, { recursive: true, force: true });
    } catch {
      // another run removed it meanwhile: nothing to do
    }
  }
  mkdirSync(RENDERS, { recursive: true, mode: 0o700 });
  const tmp = mkdtempSync(join(RENDER_TMP, "r-"));
  writeFileSync(join(tmp, "pid"), `${process.pid}\n`); // a long render's folder is never taken for a killed run's
  const cleanup = () => rmSync(tmp, { recursive: true, force: true });
  for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) {
    process.on(sig, () => {
      cleanup();
      process.exit(130);
    });
  }
  let status = 1;
  try {
    const project = join(tmp, "project");
    const work = join(tmp, "work");
    mkdirSync(project, { mode: 0o700 });
    mkdirSync(work, { mode: 0o700 });
    unzipInto(await download(media.bundle_url, "the bundle"), project);
    const page = readFileSync(join(project, "index.html"), "utf8");
    if (!ISOLATED.test(page)) throw new Error("the bundle's page has no isolation mark: nothing rendered (tell the person)");
    for (const f of files) {
      const dest = resolve(project, f.path);
      if (!dest.startsWith(project + sep)) throw new Error(`${f.path} leaves the folder`);
      const data = await download(f.url, f.path);
      mkdirSync(dirname(dest), { recursive: true, mode: 0o700 });
      writeFileSync(dest, data, { mode: 0o600 });
    }
    const out = join(RENDERS, `takepilot-${Date.now()}-${randomBytes(3).toString("hex")}.mp4`);
    // the CLI's own temporary files stay in the folder that is deleted
    const r = spawnSync(process.execPath, [bin, "render", project, ...rest, "--output", out], {
      stdio: "inherit",
      env: { ...env, TMPDIR: work, TMP: work, TEMP: work },
    });
    if (r.error) throw r.error;
    status = r.status ?? 1;
    if (status === 0) process.stdout.write(`rendered: ${out}\n`);
  } catch (err) {
    process.stderr.write(`hyperframes.mjs: ${err.message}\n`);
    status = 4;
  } finally {
    cleanup();
  }
  process.exit(status);
}

async function main() {
  if (process.argv[2] === "--takepilot-build") {
    process.stdout.write(`${VERSION}\n`);
    return;
  }
  if (process.argv[2] === "takepilot-render") {
    await takepilotRender(process.argv.slice(3));
    return;
  }
  const { bin, env } = await ensureCLI();
  const r = spawnSync(process.execPath, [bin, ...process.argv.slice(2)], { stdio: "inherit", env });
  if (r.error) fail(4, r.error.message);
  process.exit(r.status ?? 1);
}

await main();
