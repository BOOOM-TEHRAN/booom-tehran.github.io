// Camera artwork recognition (MindAR 1.2.5 + three 0.147.0, vendored in ar/vendor/).
// Nothing heavy downloads until the visitor taps «روشن کردن دوربین».
const C = window.CATALOG;
const $ = (id) => document.getElementById(id);
const fa = (n) => Number(n).toLocaleString("fa-IR");
const money = (m) => Math.abs(m - Math.round(m)) < 1e-9
  ? [fa(Math.round(m)), "میلیون تومان"]
  : [fa(Math.round(m * 1e6)), "تومان"];
const KEY = "steelpop-list-v1"; // same list as the catalog page
const PREF = "booom-ar-canvas";
const here = (p) => new URL(p, import.meta.url).href;

// [path, uncompressed bytes (progress bar: fetch reports decompressed bytes), gzip bytes (data estimate: Pages serves JS gzipped)]
const VENDOR = [
  ["./vendor/three.module.js", 1171690, 237717],
  ["./vendor/addons/renderers/CSS3DRenderer.js", 6939, 1931],
  ["./vendor/mindar-image-three.prod.js", 385065, 59746],
  ["./vendor/controller-mGt1s8dJ.js", 2199370, 369688],
  ["./vendor/ui-fBadYuor.js", 4552, 1573]
];

const art = C.sections.filter((s) => s.kind === "art");
const byCode = {};
C.sections.forEach((s) => s.items.forEach((it) => { it.sec = s; byCode[it.code] = it; }));

// ── start screen ─────────────────────────────────
const pool = art.flatMap((s) => s.items).filter((it) => !it.sold);
const hero = pool[Math.floor(Math.random() * pool.length)];
if (hero) for (const id of ["heroImg", "loadImg"]) { const im = $(id); im.src = hero.img; im.width = hero.w; im.height = hero.h; }

let manifest = null;
const manifestP = fetch(here("./targets.json"), { cache: "no-store" }).then((r) => r.json()).then((m) => {
  manifest = m;
  const gz = "DecompressionStream" in window && m.bytes && m.bytes.gz;
  const bytes = VENDOR.reduce((a, f) => a + f[2], 0) + (m.bytes ? (gz ? m.bytes.gz : m.bytes.mind) : 0);
  $("sizeNote").textContent = "بار اول حدود " + fa(Math.max(1, Math.round(bytes / 1e6))) + " مگابایت داده دانلود می‌شود.";
  return m;
});
manifestP.catch(() => {}); // handled when the visitor taps the button

function show(id) {
  for (const s of ["start", "loading", "error"]) $(s).hidden = s !== id;
}
function fail(title, msg) {
  $("errTitle").textContent = title;
  $("errMsg").textContent = msg;
  show("error");
  $("view").hidden = true;
}

// ── download with progress ───────────────────────
let got = 0, total = 1;
function progress() {
  const p = Math.min(100, Math.round(got / total * 100));
  $("meterBar").style.width = p + "%";
  $("meter").setAttribute("aria-valuenow", p);
  $("pct").textContent = fa(p) + "٪";
  $("pctMB").textContent = fa((got / 1e6).toFixed(1)) + " از " + fa((total / 1e6).toFixed(1)) + " مگابایت";
}
async function fetchBytes(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(r.status + " " + url);
  if (!r.body || !r.body.getReader) { const b = new Uint8Array(await r.arrayBuffer()); got += b.length; progress(); return b; }
  const reader = r.body.getReader(), parts = [];
  let n = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value); n += value.length; got += value.length; progress();
  }
  const out = new Uint8Array(n);
  let o = 0;
  for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
}
async function gunzip(bytes) {
  const s = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
  return new Uint8Array(await new Response(s).arrayBuffer());
}

// ── my list ──────────────────────────────────────
const readList = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]").filter((c) => byCode[c]); } catch (e) { return []; } };
const writeList = (l) => { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) {} };
let toastT;
function toast(msg) {
  const el = $("toast");
  el.textContent = msg; el.classList.add("on");
  clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("on"), 1600);
}

// ── info card ────────────────────────────────────
let current = null;
function syncAdd() {
  if (!current) return;
  const b = $("cAdd");
  if (current.sold) { b.disabled = true; b.textContent = "فروخته شد"; b.setAttribute("aria-pressed", "false"); return; }
  const on = readList().includes(current.code);
  b.disabled = false;
  b.setAttribute("aria-pressed", on ? "true" : "false");
  b.textContent = on ? "✓ در لیست" : "+ لیست";
}
function showCard(it) {
  current = it;
  const card = $("card");
  card.style.setProperty("--ac", it.sec.accent || "#b8322a");
  card.classList.toggle("is-sold", !!it.sold);
  $("cImg").src = it.img;
  $("cCode").textContent = it.code;
  $("cTitle").textContent = it.title;
  if (it.sold) $("cTitle").insertAdjacentHTML("beforeend", '<span class="sold-tag">فروخته شد</span>');
  $("cBrand").textContent = it.sec.brand;
  const chips = [it.name || it.sub, it.size, it.medium, it.edition ? "ادیشن " + it.edition : "", it.year ? "سال تولید " + it.year : ""].concat(it.specs || []).filter(Boolean);
  $("cChips").innerHTML = "";
  for (const c of chips) $("cChips").appendChild(Object.assign(document.createElement("li"), { textContent: c }));
  const pr = $("cPrice");
  pr.className = "c-price";
  if (typeof it.price === "number") { const m = money(it.price); pr.innerHTML = "<strong></strong><span></span>"; pr.firstChild.textContent = m[0]; pr.lastChild.textContent = m[1]; }
  else if (it.priceText) { pr.innerHTML = "<strong></strong><span></span>"; pr.firstChild.textContent = it.priceText[0]; pr.lastChild.textContent = it.priceText[1]; }
  else { pr.classList.add("na"); pr.innerHTML = "<strong>استعلام در غرفه</strong>"; }
  $("cMore").href = "./#item-" + encodeURIComponent(it.code);
  syncAdd();
  card.hidden = false;
}
// a closed card stays closed while that artwork stays in view (tracking blips under 2s included)
let dismissed = null;
$("cClose").addEventListener("click", () => { $("card").hidden = true; if (current) dismissed = { code: current.code, lostAt: 0 }; current = null; });
$("cAdd").addEventListener("click", () => {
  if (!current || current.sold) return;
  const l = readList(), i = l.indexOf(current.code);
  if (i > -1) { l.splice(i, 1); toast("از لیست برداشته شد"); } else { l.push(current.code); toast(current.code + " به لیست اضافه شد"); }
  writeList(l); syncAdd();
});
window.addEventListener("storage", (e) => { if (e.key === KEY) syncAdd(); });

// ── canvas mode («حالت بوم») ──────────────────────
let canvasOn = true;
try { canvasOn = localStorage.getItem(PREF) !== "0"; } catch (e) {}
function setCanvas(on) {
  canvasOn = on;
  $("view").classList.toggle("canvas-on", on);
  $("canvasBtn").setAttribute("aria-pressed", on ? "true" : "false");
  try { localStorage.setItem(PREF, on ? "1" : "0"); } catch (e) {}
}
setCanvas(canvasOn);
$("canvasBtn").addEventListener("click", () => setCanvas(!canvasOn));

// ── camera ───────────────────────────────────────
let mindar = null, starting = false;
async function start() {
  if (starting) return;
  starting = true;
  try {
    if (!window.isSecureContext) return fail("این صفحه باید با https باز شود", "مرورگر فقط در نشانی امن (https) اجازه‌ی استفاده از دوربین می‌دهد.");
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return fail("مرورگر از دوربین پشتیبانی نمی‌کند", "این صفحه را در کروم یا سافاری به‌روز باز کنید.");
    show("loading");
    $("loadTitle").textContent = "در حال آماده‌سازی…";
    $("loadMsg").textContent = "فایل‌های شناسایی در حال دانلود است.";
    const m = manifest || await manifestP;
    const gz = "DecompressionStream" in window && m.bytes && m.bytes.gz;
    const v = "?v=" + encodeURIComponent(m.built || "");
    got = 0;
    total = VENDOR.reduce((a, f) => a + f[1], 0) + (m.bytes ? (gz ? m.bytes.gz : m.bytes.mind) : 0);
    progress();
    // download everything once with progress; the imports below are then served from the cache
    const [, mindBytes] = await Promise.all([
      Promise.all(VENDOR.map((f) => fetchBytes(here(f[0])))),
      fetchBytes(here(gz ? "./targets.mind.gz" + v : "./targets.mind" + v))
    ]);
    const targets = gz ? await gunzip(mindBytes) : mindBytes;
    const src = URL.createObjectURL(new Blob([targets], { type: "application/octet-stream" }));
    const [{ MindARThree }, { CSS3DObject }] = await Promise.all([
      import("./vendor/mindar-image-three.prod.js"),
      import("three/addons/renderers/CSS3DRenderer.js")
    ]);

    $("loadTitle").textContent = "در حال روشن کردن دوربین…";
    $("loadMsg").textContent = "اگر مرورگر اجازه خواست، «اجازه دادن» را بزنید.";
    // ask for the camera ourselves first, so a refusal can be explained
    try {
      const probe = await navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: "environment" } });
      probe.getTracks().forEach((t) => t.stop());
    } catch (e) {
      const name = e && e.name;
      return fail("دوربین روشن نشد",
        name === "NotAllowedError" || name === "SecurityError"
          ? "اجازه‌ی دوربین داده نشد. از تنظیمات مرورگر برای این سایت اجازه‌ی دوربین را روشن کنید و دوباره امتحان کنید."
          : name === "NotFoundError" || name === "OverconstrainedError"
            ? "دوربینی روی این دستگاه پیدا نشد."
            : "دوربین در دسترس نیست؛ شاید برنامه‌ی دیگری از آن استفاده می‌کند.");
    }

    $("view").hidden = false;
    mindar = new MindARThree({
      container: $("stage"),
      imageTargetSrc: src,
      maxTrack: 1,
      uiLoading: "no", uiScanning: "no", uiError: "no",
      filterMinCF: 0.0001, filterBeta: 0.001
    });
    const visible = new Set();
    m.targets.forEach((t, i) => {
      const it = byCode[t.code];
      if (!it) return;
      const hole = document.createElement("div");
      hole.className = "hole";
      hole.style.height = (1000 * t.h / t.w) + "px";
      const lab = document.createElement("div");
      lab.className = "lab";
      lab.innerHTML = "<b></b><span></span>";
      lab.firstChild.textContent = it.code;
      lab.lastChild.textContent = it.title;
      hole.appendChild(lab);
      const anchor = mindar.addCSSAnchor(i);
      anchor.group.add(new CSS3DObject(hole));
      anchor.onTargetFound = () => {
        visible.add(i); $("view").classList.add("found");
        if (dismissed && dismissed.code === it.code && (!dismissed.lostAt || Date.now() - dismissed.lostAt < 2000)) return;
        dismissed = null; showCard(it);
      };
      anchor.onTargetLost = () => {
        visible.delete(i); if (!visible.size) $("view").classList.remove("found");
        if (dismissed && dismissed.code === it.code) dismissed.lostAt = Date.now();
      };
    });
    await mindar.start();
    mindar.renderer.setAnimationLoop(() => mindar.cssRenderer.render(mindar.cssScene, mindar.camera));
    show(null);
  } catch (e) {
    console.warn(e);
    fail("شناسایی شروع نشد", "اتصال اینترنت را بررسی کنید و دوباره امتحان کنید.");
  } finally {
    starting = false;
  }
}
$("go").addEventListener("click", start);
$("retry").addEventListener("click", () => location.reload());

window.addEventListener("pagehide", () => { try { if (mindar) mindar.stop(); } catch (e) {} });
window.addEventListener("pageshow", (e) => { if (e.persisted && mindar) location.reload(); });
