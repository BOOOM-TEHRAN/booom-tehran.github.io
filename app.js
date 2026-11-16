(function () {
  "use strict";
  var C = window.CATALOG;
  if (!C) return;

  var $ = function (id) { return document.getElementById(id); };
  var fa = function (n) { return Number(n).toLocaleString("fa-IR"); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  // prices are stored in million toman; whole millions show as «۲۱۰ میلیون تومان»,
  // anything with a fraction (e.g. 3.8) shows in full: «۳٬۸۰۰٬۰۰۰ تومان»
  var money = function (m) {
    return Math.abs(m - Math.round(m)) < 1e-9
      ? [fa(Math.round(m)), "میلیون تومان"]
      : [fa(Math.round(m * 1e6)), "تومان"];
  };
  var isLatin = function (s) { return /^[\x00-\x7FÀ-ſ\s]+$/.test(s); };
  var LTR = ' dir="ltr" lang="en"';
  var ltr = function (s) { return isLatin(s) ? LTR : ""; };
  // escape, and wrap Latin runs inside Persian text so they read left-to-right («مغازه · MAGHAAZE»)
  var rich = function (s) {
    var re = /[A-Za-zÀ-ſ][A-Za-zÀ-ſ0-9.'&\/ -]*[A-Za-zÀ-ſ0-9]|[A-Za-zÀ-ſ]/g, out = "", last = 0, m;
    s = String(s == null ? "" : s);
    while ((m = re.exec(s))) {
      out += esc(s.slice(last, m.index)) + "<span" + LTR + ">" + esc(m[0]) + "</span>";
      last = m.index + m[0].length;
    }
    return out + esc(s.slice(last));
  };
  var has = function (v) { return v != null && v !== "" && v !== false && !(Array.isArray(v) && !v.length); };
  var icon = function (d, size) {
    return '<svg class="ic" viewBox="0 0 24 24" width="' + (size || 22) + '" height="' + (size || 22) + '" aria-hidden="true"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  };
  var ARROW = '<svg class="ic" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 2.5v10M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // ── index items by code ─────────────────────────
  var byCode = {};
  C.sections.forEach(function (sec) {
    sec.items.forEach(function (it, i) { it.sec = sec; it.pos = i; byCode[it.code] = it; });
  });

  // ── item facts ──────────────────────────────────
  // short line under the card title: same text the old `specs` produced
  function facts(it) {
    var out = [];
    if (has(it.age)) out.push(/[0-9۰-۹]/.test(it.age) ? "قدمت " + it.age : it.age);
    if (has(it.size)) out.push(it.size);
    if (has(it.medium)) out.push(it.medium);
    if (has(it.edition)) out.push("ادیشن " + it.edition);
    if (has(it.year)) out.push("سال تولید " + it.year);
    return out.concat(it.specs || []);
  }
  var subOf = function (it) { return it.name || it.sub || ""; };
  var yes = function (v, t, f) { return v === true ? t : v === false ? f : v; };

  // rows for the detail page; empty fields never show
  function rows(it) {
    var art = it.sec.kind === "art";
    var r = [];
    var add = function (label, v) { if (has(v)) r.push([label, Array.isArray(v) ? v.join(" · ") : String(v)]); };
    if (art) add("هنرمند", it.title);
    add("نام اثر", it.name);
    add("نوع", it.type);
    add("تکنیک", it.medium);
    add("طراح", it.designer);
    add("جنس", it.material);
    add("ابعاد", it.size);
    add("ادیشن", it.edition);
    add("امضا", it.signature);
    add("قاب", has(it.framed) || it.framed === false ? yes(it.framed, "با قاب", "بدون قاب") : null);
    add("سال تولید", it.year);
    add("قدمت", it.age);
    add("وضعیت", it.condition);
    add("گواهی اصالت", yes(it.cert, "دارد", null));
    add("مشخصات", it.specs);
    add("برند / غرفه", it.sec.brand);
    return r;
  }

  function priceHTML(it, cls) {
    return typeof it.price === "number"
      ? '<p class="' + cls + '"><strong>' + money(it.price)[0] + "</strong><span>" + money(it.price)[1] + "</span></p>"
      : it.priceText
        ? '<p class="' + cls + '"><strong>' + esc(it.priceText[0]) + "</strong><span>" + esc(it.priceText[1]) + "</span></p>"
        : '<p class="' + cls + ' na"><strong>استعلام در غرفه</strong></p>';
  }
  var priceText = function (it) {
    return typeof it.price === "number" ? money(it.price).join(" ") : it.priceText ? it.priceText.join(" ") : "استعلام در غرفه";
  };

  // ── participants ────────────────────────────────
  $("who").innerHTML = C.participants.map(function (p) {
    return '<li><span class="nm"><b>' + esc(p[0]) + "</b><i" + LTR + ">" + esc(p[1]) + "</i></span><span>" + rich(p[2]) + "</span></li>";
  }).join("");

  // ── nav + sections ──────────────────────────────
  // each brand's accent colour travels as the CSS variable --ac
  var acc = function (s) { return s.accent ? ' style="--ac:' + esc(s.accent) + '"' : ""; };
  var dims = function (s) { return s.logoW ? ' width="' + s.logoW + '" height="' + s.logoH + '"' : ""; };

  $("tabs").innerHTML = C.sections.map(function (s) {
    return '<li><a href="#' + s.id + '"' + acc(s) + '><i class="dot" aria-hidden="true"></i>' + esc(s.nav) + "</a></li>";
  }).join("");

  $("quick").innerHTML = C.sections.map(function (s) {
    var n = s.items.length;
    var mark = s.logo
      ? '<img class="mk" src="' + esc(s.logo) + '"' + dims(s) + ' alt="" aria-hidden="true">'
      : s.motif === "paint" ? '<i class="mk frame" aria-hidden="true"></i>' : "";
    return '<li><a href="#' + s.id + '"' + acc(s) + ' class="m-' + esc(s.motif || "none") + (n ? "" : " soon-t") + '">' +
      "<b>" + esc(s.nav) + "</b>" +
      (s.tagline ? "<em>" + rich(s.tagline) + "</em>" : "") +
      "<span>" + (n ? fa(n) + " " + esc(s.unit || "قطعه") + " " + ARROW : "به‌زودی") + "</span>" + mark + "</a></li>";
  }).join("");

  function card(it) {
    var f = facts(it), sub = subOf(it), label = it.title + (sub ? "، " + sub : "");
    return (
      '<article class="card' + (it.sold ? " is-sold" : "") + '" data-code="' + esc(it.code) + '">' +
        '<button class="ph" type="button" data-open="' + esc(it.code) + '" aria-label="جزئیات ' + esc(it.code + " " + label) + '">' +
          '<img src="' + esc(it.img) + '" alt="' + esc(label) + '" width="' + it.w + '" height="' + it.h + '" loading="lazy" decoding="async">' +
          '<span class="tagd" aria-hidden="true">جزئیات</span>' +
        "</button>" +
        '<div class="body">' +
          '<span class="code">' + esc(it.code) + "</span>" +
          '<h3><a href="#item-' + esc(it.code) + '" data-open="' + esc(it.code) + '"' + ltr(it.title) + ">" + esc(it.title) + "</a></h3>" +
          (sub ? '<p class="sub"' + ltr(sub) + ">" + esc(sub) + "</p>" : "") +
          (f.length ? '<p class="specs">' + f.map(esc).join(" · ") + "</p>" : "") +
          '<div class="buy">' + priceHTML(it, "price") +
            '<button class="add" type="button" data-add="' + esc(it.code) + '" aria-pressed="false"' + (it.sold ? " disabled" : "") + ">" +
              (it.sold ? "فروخته شد" : "+ لیست من") +
            "</button>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  // cards in order; a heading goes in wherever the item's `group` changes
  function cards(items, unit) {
    var out = "", g = null;
    items.forEach(function (it) {
      if (it.group && it.group !== g) {
        g = it.group;
        var c = items.filter(function (x) { return x.group === g; }).length;
        out += '<div class="grp-h"><h3>' + rich(g) + "</h3><span>" + fa(c) + " " + esc(unit) + "</span></div>";
      }
      out += card(it);
    });
    return out;
  }

  var CAM = icon("M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.4-2h5.8l1.4 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5zM15.4 12.8a3.4 3.4 0 1 1-6.8 0 3.4 3.4 0 0 1 6.8 0z", 18);

  $("sections").insertAdjacentHTML("beforeend", C.sections.map(function (s) {
    var n = s.items.length;
    var head =
      '<div class="sec-head">' +
        (s.logo ? '<img class="logo" src="' + esc(s.logo) + '"' + dims(s) + ' alt="' + esc(s.brand) + '" loading="lazy">' : "") +
        "<h2" + ltr(s.title) + ">" + esc(s.title) + "</h2>" +
        '<p class="brand">' + rich(s.brand) + (s.note ? " · " + rich(s.note) : "") + "</p>" +
        (n ? '<p class="meta">' + fa(n) + " " + esc(s.unit || "قطعه") + "</p>" : "") +
        (s.kind === "art" ? '<a class="campill" href="ar.html">' + CAM + "<span>شناسایی با دوربین</span></a>" : "") +
      "</div>";
    var body = n
      ? '<div class="items ' + (s.layout || "grid") + '">' + cards(s.items, s.unit || "قطعه") + "</div>"
      : '<div class="soon"><strong>به‌زودی</strong><p>فهرست قیمت این بخش به‌زودی اینجا قرار می‌گیرد.</p></div>';
    return '<section class="sec" id="' + s.id + '"' + acc(s) + ' aria-label="' + esc(s.nav) + '">' + head + body + "</section>";
  }).join(""));

  // ── active tab ──────────────────────────────────
  var links = Array.prototype.slice.call(document.querySelectorAll(".tabs a"));
  function setActive(id) {
    links.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + id;
      a.setAttribute("aria-current", on ? "true" : "false");
      if (on && a.scrollIntoView) {
        var ul = a.parentNode.parentNode, r = a.getBoundingClientRect(), u = ul.getBoundingClientRect();
        if (r.left < u.left || r.right > u.right) ul.scrollLeft += r.left - u.left - 16; // instant: a second smooth scroll would cancel the page's own smooth scroll in Chrome
      }
    });
  }
  if ("IntersectionObserver" in window) {
    var targets = C.sections.map(function (s) { return $(s.id); }).concat([$("about")]);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  }

  // ── my list (stored on this phone only; ar.html shares the same key) ──
  var KEY = "steelpop-list-v1";
  var list = [];
  function load() {
    try { list = JSON.parse(localStorage.getItem(KEY) || "[]").filter(function (c) { return byCode[c]; }); } catch (e) { list = []; }
  }
  load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} }

  function sumOf(codes) {
    var s = 0, ask = false, extra = [];
    codes.forEach(function (c) {
      var it = byCode[c];
      if (typeof it.price === "number") s += it.price;
      else if (it.priceText) extra.push(it.priceText.join(" "));
      else ask = true;
    });
    return { s: s, ask: ask, extra: extra };
  }

  // items priced in another currency are listed beside the toman total, never added to it
  function totalText(t) {
    var parts = t.s || !t.extra.length ? [money(t.s).join(" ")] : [];
    return parts.concat(t.extra).join(" + ") + (t.ask ? " +" : "");
  }

  function refresh() {
    document.querySelectorAll("[data-add]").forEach(function (b) {
      var it = byCode[b.getAttribute("data-add")];
      if (!it || it.sold) return;
      var on = list.indexOf(it.code) > -1;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.textContent = on ? (b.getAttribute("data-on") || "✓ در لیست") : (b.getAttribute("data-off") || "+ لیست من");
    });
    var bar = $("listbar");
    bar.hidden = list.length === 0;
    document.body.classList.toggle("has-list", list.length > 0);
    $("listN").textContent = fa(list.length);
    $("listT").textContent = "جمع " + totalText(sumOf(list));
  }

  function renderSheet() {
    if (!list.length) {
      $("sheetBody").innerHTML = '<p class="hint">لیست شما خالی است.</p>';
      $("sheetTotal").textContent = fa(0);
      $("sheetUnit").textContent = "میلیون تومان";
      return;
    }
    $("sheetBody").innerHTML = C.sections.map(function (s) {
      var codes = list.filter(function (c) { return byCode[c].sec === s; });
      if (!codes.length) return "";
      var st = sumOf(codes);
      var head = s.brand.indexOf(s.nav) === 0 ? rich(s.brand) : esc(s.nav) + " · " + rich(s.brand); // «مغازه · MAGHAAZE», not «مغازه · مغازه · …»
      return '<div class="grp"' + acc(s) + "><h3>" + head + "</h3>" +
        codes.map(function (c) {
          var it = byCode[c], sub = subOf(it);
          return '<div class="row' + (it.sold ? " sold" : "") + '">' +
            '<img src="' + esc(it.img) + '" alt="" width="56" height="56" loading="lazy">' +
            "<div>" +
              '<div class="c">' + esc(it.code) + "</div>" +
              '<div class="tt"' + ltr(it.title) + ">" + esc(it.title) + "</div>" +
              '<div class="pp">' + (sub ? rich(sub) + " · " : "") + esc(priceText(it)) + "</div>" +
            "</div>" +
            '<button class="rm" type="button" data-rm="' + esc(c) + '" aria-label="حذف ' + esc(it.code + " " + it.title) + ' از لیست">' + icon("M6 6l12 12M18 6 6 18", 18) + "</button>" +
          "</div>";
        }).join("") +
        (codes.length > 1 ? '<div class="sub-t">جمع این بخش: ' + esc(totalText(st)) + "</div>" : "") +
        "</div>";
    }).join("");
    var t = sumOf(list), tm = money(t.s);
    $("sheetTotal").textContent = t.extra.length ? totalText(t) : tm[0] + (t.ask ? " +" : "");
    $("sheetUnit").textContent = t.extra.length ? "" : tm[1];
  }

  var toastT;
  function toast(msg) {
    var el = $("toast");
    el.textContent = msg; el.classList.add("on");
    // a popover sits in the top layer, so the toast also shows above an open dialog
    if (el.showPopover) { try { if (el.matches(":popover-open")) el.hidePopover(); el.showPopover(); } catch (e) {} }
    clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove("on"); }, 1600);
  }

  function openDialog(d) { if (d.open) return; if (d.showModal) d.showModal(); else d.setAttribute("open", ""); }
  function closeDialog(d) { if (!d.open) return; if (d.close) d.close(); else d.removeAttribute("open"); }

  // ── product detail (#item-CODE) ─────────────────
  var dlg = $("detail"), cur = null, baseTitle = document.title, lastFocus = null;
  var hashCode = function () { var m = /^#item-(.+)$/.exec(decodeURIComponent(location.hash)); return m && byCode[m[1]] ? m[1] : null; };

  function renderDetail(it) {
    var s = it.sec, n = s.items.length, sub = subOf(it), r = rows(it);
    var imgs = [it.img].concat(it.imgs || []);
    var details = it.details ? [].concat(it.details).filter(has) : [];
    dlg.style.setProperty("--ac", s.accent || "var(--orange)");
    dlg.classList.toggle("is-sold", !!it.sold);
    $("dPrev").disabled = it.pos === 0;
    $("dNext").disabled = it.pos === n - 1;
    $("dMedia").innerHTML =
      '<div class="d-img"><img id="dImg" src="' + esc(it.img) + '" alt="' + esc(it.title + (sub ? "، " + sub : "")) + '" width="' + it.w + '" height="' + it.h + '" decoding="async">' +
        (it.sold ? '<span class="d-sold">فروخته شد</span>' : "") +
        '<button class="zoom-btn" type="button" id="dZoom" aria-label="بزرگ‌نمایی تصویر">' + icon("M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM20 20l-4.8-4.8M10.5 7.8v5.4M7.8 10.5h5.4", 18) + "<span>زوم</span></button>" +
      "</div>" +
      (imgs.length > 1 ? '<div class="d-thumbs">' + imgs.map(function (src, i) {
        return '<button type="button" data-img="' + esc(src) + '" aria-label="عکس ' + fa(i + 1) + '"' + (i ? "" : ' aria-current="true"') + '><img src="' + esc(src) + '" alt="" width="56" height="56" loading="lazy"></button>';
      }).join("") + "</div>" : "");
    $("dInfo").innerHTML =
      '<div class="d-meta"><span class="code">' + esc(it.code) + "</span><span>" + esc(s.nav) + " <span aria-hidden=\"true\">—</span> " + fa(it.pos + 1) + " از " + fa(n) + "</span></div>" +
      '<h2 id="dTitle"' + ltr(it.title) + ">" + esc(it.title) + "</h2>" +
      (sub ? '<p class="d-sub"' + ltr(sub) + ">" + esc(sub) + "</p>" : "") +
      (it.group ? '<p class="d-grp">' + rich(it.group) + "</p>" : "") +
      '<dl class="d-rows">' + r.map(function (x) { return "<div><dt>" + esc(x[0]) + "</dt><dd>" + rich(x[1]) + "</dd></div>"; }).join("") + "</dl>" +
      (has(it.desc) ? '<p class="d-desc">' + rich(it.desc) + "</p>" : "") +
      (details.length ? '<ul class="d-details">' + details.map(function (d) { return "<li>" + rich(d) + "</li>"; }).join("") + "</ul>" : "");
    $("dBuy").innerHTML = priceHTML(it, "price") +
      '<button class="btn d-add" type="button" data-add="' + esc(it.code) + '" data-off="+ افزودن به لیست من" data-on="✓ در لیست من" aria-pressed="false"' + (it.sold ? " disabled" : "") + ">" +
        (it.sold ? "فروخته شد" : "+ افزودن به لیست من") + "</button>";
    $("dScroll").scrollTop = 0;
    document.title = it.code + " · " + it.title + " · BOOOM";
    refresh();
  }

  function showDetail(code) {
    var it = byCode[code];
    if (!it) return;
    if (!dlg.open) lastFocus = document.activeElement;
    cur = it;
    renderDetail(it);
    if (!dlg.open) { openDialog(dlg); document.documentElement.classList.add("lock"); $("dClose").focus(); }
  }
  function hideDetail() {
    closeDialog($("viewer"));
    if (!dlg.open) return;
    closeDialog(dlg);
    document.documentElement.classList.remove("lock");
    document.title = baseTitle;
    // back on the page, keep the card of the last item in view and focused
    var c = cur && document.querySelector('.card[data-code="' + cur.code + '"]');
    if (c) {
      var r = c.getBoundingClientRect();
      if (r.top < 60 || r.bottom > innerHeight) c.scrollIntoView({ block: "center" });
      var b = c.querySelector(".ph"); if (b) b.focus({ preventScroll: true });
    } else if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    cur = null;
  }

  // history: opening pushes #item-CODE, prev/next replaces it, closing goes back
  function openItem(code) {
    history.pushState({ item: code }, "", "#item-" + code);
    showDetail(code);
  }
  function stepItem(d) {
    if (!cur) return;
    var it = cur.sec.items[cur.pos + d];
    if (!it) return;
    history.replaceState({ item: it.code, root: history.state && history.state.root }, "", "#item-" + it.code);
    showDetail(it.code);
  }
  function closeItem() {
    if (history.state && history.state.item && !history.state.root) { history.back(); return; }
    history.replaceState(null, "", location.pathname + location.search);
    hideDetail();
  }
  window.addEventListener("popstate", function (e) {
    var st = e.state || {};
    if (!st.zoom) closeDialog($("viewer"));
    var code = st.item || hashCode();
    if (code) showDetail(code); else hideDetail();
  });
  dlg.addEventListener("cancel", function (e) { e.preventDefault(); closeItem(); });
  $("dClose").addEventListener("click", closeItem);
  $("dPrev").addEventListener("click", function () { stepItem(-1); });
  $("dNext").addEventListener("click", function () { stepItem(1); });
  dlg.addEventListener("keydown", function (e) {
    if ($("viewer").open || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowRight") { e.preventDefault(); stepItem(-1); } // RTL: right is back
    else if (e.key === "ArrowLeft") { e.preventDefault(); stepItem(1); }
  });

  // swipe between items; ignore touches that start at the screen edges (system back gestures)
  (function () {
    var x0 = null, y0 = 0, t0 = 0, EDGE = 24;
    $("dScroll").addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) { x0 = null; return; }
      var t = e.touches[0];
      x0 = t.clientX < EDGE || t.clientX > innerWidth - EDGE ? null : t.clientX;
      y0 = t.clientY; t0 = Date.now();
    }, { passive: true });
    $("dScroll").addEventListener("touchend", function (e) {
      if (x0 == null) return;
      var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 60 && Math.abs(dy) < Math.abs(dx) * 0.6 && Date.now() - t0 < 700) stepItem(dx > 0 ? 1 : -1); // RTL: next item comes from the left
    }, { passive: true });
  })();

  $("dMedia").addEventListener("click", function (e) {
    var th = e.target.closest("[data-img]");
    if (th) {
      $("dImg").src = th.getAttribute("data-img");
      $("dMedia").querySelectorAll("[data-img]").forEach(function (b) { b.setAttribute("aria-current", b === th ? "true" : "false"); });
      return;
    }
    if (e.target.closest("#dZoom") || e.target.id === "dImg") openZoom($("dImg").getAttribute("src"), $("dImg").alt);
  });

  // ── zoom viewer: pinch, double-tap, drag, wheel; scale 1–6 ──
  var Z = { s: 1, x: 0, y: 0 }, zimg = $("zImg"), zst = $("zStage"), MIN = 1, MAX = 6;
  function zFit() {
    var W = zst.clientWidth, H = zst.clientHeight, nw = zimg.naturalWidth || W, nh = zimg.naturalHeight || H;
    var k = Math.min(W / nw, H / nh);
    return { W: W, H: H, w: nw * k, h: nh * k };
  }
  function zApply(anim) {
    var f = zFit();
    Z.s = Math.min(MAX, Math.max(MIN, Z.s));
    var mx = Math.max(0, (f.w * Z.s - f.W) / 2), my = Math.max(0, (f.h * Z.s - f.H) / 2);
    Z.x = Math.min(mx, Math.max(-mx, Z.x));
    Z.y = Math.min(my, Math.max(-my, Z.y));
    zimg.classList.toggle("anim", !!anim);
    zimg.style.transform = "translate(" + Z.x + "px," + Z.y + "px) scale(" + Z.s + ")";
    $("zOut").disabled = Z.s <= MIN + 1e-3;
    $("zIn").disabled = Z.s >= MAX - 1e-3;
  }
  // zoom to scale s keeping the point (px, py) — relative to the stage centre — fixed
  function zTo(s, px, py, anim) {
    s = Math.min(MAX, Math.max(MIN, s));
    Z.x = px - (px - Z.x) * (s / Z.s);
    Z.y = py - (py - Z.y) * (s / Z.s);
    Z.s = s;
    zApply(anim);
  }
  function rel(cx, cy) { var r = zst.getBoundingClientRect(); return [cx - r.left - r.width / 2, cy - r.top - r.height / 2]; }
  function openZoom(src, alt) {
    Z = { s: 1, x: 0, y: 0 };
    zimg.src = src; zimg.alt = alt || "";
    zApply();
    history.pushState({ item: cur && cur.code, zoom: 1, root: history.state && history.state.root }, "", location.href);
    openDialog($("viewer"));
    $("zClose").focus();
  }
  function closeZoom() {
    if (history.state && history.state.zoom) history.back(); else closeDialog($("viewer"));
  }
  zimg.addEventListener("load", function () { zApply(); });
  window.addEventListener("resize", function () { if ($("viewer").open) zApply(); });
  $("viewer").addEventListener("cancel", function (e) { e.preventDefault(); closeZoom(); });
  $("zClose").addEventListener("click", closeZoom);
  $("zIn").addEventListener("click", function () { zTo(Z.s * 1.6, 0, 0, true); });
  $("zOut").addEventListener("click", function () { zTo(Z.s / 1.6, 0, 0, true); });
  zst.addEventListener("wheel", function (e) {
    e.preventDefault();
    var p = rel(e.clientX, e.clientY);
    zTo(Z.s * Math.exp(-e.deltaY * (e.deltaMode ? 0.05 : 0.002)), p[0], p[1]);
  }, { passive: false });
  (function () {
    var pts = {}, start = null, lastTap = 0, tapX = 0, tapY = 0, moved = false;
    var list2 = function () { return Object.keys(pts).map(function (k) { return pts[k]; }); };
    function begin() {
      var p = list2();
      if (p.length === 2) {
        var m = rel((p[0].x + p[1].x) / 2, (p[0].y + p[1].y) / 2);
        start = { d: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1, s: Z.s, x: Z.x, y: Z.y, mx: m[0], my: m[1] };
      } else if (p.length === 1) start = { x: Z.x, y: Z.y, px: p[0].x, py: p[0].y };
      else start = null;
    }
    zst.addEventListener("pointerdown", function (e) {
      try { zst.setPointerCapture(e.pointerId); } catch (err) {}
      pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      moved = false;
      begin();
    });
    zst.addEventListener("pointermove", function (e) {
      if (!pts[e.pointerId] || !start) return;
      pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      var p = list2();
      if (p.length === 2 && start.d) {
        var d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
        var m = rel((p[0].x + p[1].x) / 2, (p[0].y + p[1].y) / 2);
        var s = Math.min(MAX, Math.max(MIN, start.s * d / start.d));
        Z.s = s;
        Z.x = m[0] - (start.mx - start.x) * (s / start.s);
        Z.y = m[1] - (start.my - start.y) * (s / start.s);
        moved = true;
        zApply();
      } else if (p.length === 1 && start.px != null) {
        var dx = e.clientX - start.px, dy = e.clientY - start.py;
        if (Math.abs(dx) + Math.abs(dy) > 6) moved = true;
        Z.x = start.x + dx; Z.y = start.y + dy;
        zApply();
      }
    });
    function end(e) {
      if (!pts[e.pointerId]) return;
      delete pts[e.pointerId];
      var left = list2().length;
      if (!left && !moved && e.type === "pointerup") {
        var now = Date.now();
        if (now - lastTap < 320 && Math.hypot(e.clientX - tapX, e.clientY - tapY) < 30) {
          var p = rel(e.clientX, e.clientY);
          if (Z.s > 1.05) { Z.x = 0; Z.y = 0; zTo(1, 0, 0, true); } else zTo(2.5, p[0], p[1], true);
          lastTap = 0;
        } else { lastTap = now; tapX = e.clientX; tapY = e.clientY; }
      }
      begin();
    }
    zst.addEventListener("pointerup", end);
    zst.addEventListener("pointercancel", end);
  })();

  // ── clicks ──────────────────────────────────────
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-add],[data-rm],[data-open],[data-close]") : null;
    if (!t) return;
    if (t.hasAttribute("data-add")) {
      var c = t.getAttribute("data-add"), i = list.indexOf(c);
      if (i > -1) { list.splice(i, 1); toast("از لیست برداشته شد"); }
      else { list.push(c); toast(byCode[c].code + " به لیست اضافه شد"); }
      save(); refresh();
    } else if (t.hasAttribute("data-rm")) {
      var j = list.indexOf(t.getAttribute("data-rm"));
      if (j > -1) list.splice(j, 1);
      save(); refresh(); renderSheet();
      if (!list.length) closeDialog($("sheet"));
    } else if (t.hasAttribute("data-open")) {
      e.preventDefault();
      closeDialog($("sheet"));
      openItem(t.getAttribute("data-open"));
    } else if (t.hasAttribute("data-close")) {
      closeDialog(t.closest("dialog"));
    }
  });

  $("sheet").addEventListener("click", function (e) { if (e.target === this) closeDialog(this); });
  $("listbar").addEventListener("click", function () { renderSheet(); openDialog($("sheet")); });
  $("clearList").addEventListener("click", function () {
    if (!window.confirm("همه‌ی کالاها از لیست برداشته شوند؟")) return;
    list = []; save(); refresh(); closeDialog($("sheet"));
  });
  // the list may have changed in ar.html (another tab, or back/forward cache)
  window.addEventListener("storage", function (e) { if (e.key === KEY) { load(); refresh(); } });
  window.addEventListener("pageshow", function (e) { if (e.persisted) { load(); refresh(); } });

  refresh();
  var start = hashCode();
  if (start) {
    history.replaceState({ item: start, root: true }, "", "#item-" + start);
    showDetail(start);
  } else if (location.hash) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView();
  }
})();
