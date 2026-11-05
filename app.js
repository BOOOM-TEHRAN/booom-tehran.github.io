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

  // ── index items by code ─────────────────────────
  var byCode = {};
  C.sections.forEach(function (sec) {
    sec.items.forEach(function (it) { it.sec = sec; byCode[it.code] = it; });
  });

  // ── event info ──────────────────────────────────
  var ev = C.event;
  $("evDates").textContent = ev.dates;
  $("evHours").textContent = ev.hours;
  $("evAddr").textContent = ev.address;
  $("footDates").textContent = ev.dates;
  $("addr").textContent = ev.address;
  $("addrWhen").textContent = ev.dates + " · " + ev.hours;
  if (ev.mapUrl) { $("mapLink").href = ev.mapUrl; $("mapLink").hidden = false; }

  $("who").innerHTML = C.participants.map(function (p) {
    return "<li><b>" + esc(p[0]) + "</b><span>" + esc(p[1]) + "</span></li>";
  }).join("");

  // ── nav + sections ──────────────────────────────
  $("tabs").innerHTML = C.sections.map(function (s) {
    return '<li><a href="#' + s.id + '">' + esc(s.nav) + "</a></li>";
  }).join("") + '<li><a href="#about">نشانی</a></li>' +
    '<li><a href="https://www.instagram.com/booom.tehran/" target="_blank" rel="noopener" lang="en" dir="ltr">Instagram</a></li>';

  $("quick").innerHTML = C.sections.map(function (s) {
    var n = s.items.length;
    return '<li><a href="#' + s.id + '"' + (n ? "" : ' class="soon-t"') + ">" +
      "<b>" + esc(s.nav) + "</b>" +
      "<span>" + (n ? fa(n) + " " + esc(s.unit || "قطعه") : "به‌زودی") + "</span></a></li>";
  }).join("");

  function card(it) {
    var hasPrice = typeof it.price === "number";
    var price = hasPrice
      ? '<p class="price"><strong>' + money(it.price)[0] + "</strong><span>" + money(it.price)[1] + "</span></p>"
      : '<p class="price na"><strong>استعلام در غرفه</strong></p>';
    return (
      '<article class="card' + (it.sold ? " is-sold" : "") + '" data-code="' + esc(it.code) + '">' +
        '<button class="ph" type="button" data-zoom="' + esc(it.code) + '" aria-label="بزرگ‌نمایی ' + esc(it.title) + '">' +
          '<img src="' + esc(it.img) + '" alt="' + esc(it.title + (it.sub ? "، " + it.sub : "")) + '" width="' + it.w + '" height="' + it.h + '" loading="lazy" decoding="async">' +
        "</button>" +
        '<div class="body">' +
          '<span class="code">' + esc(it.code) + "</span>" +
          "<h3" + (isLatin(it.title) ? ' dir="ltr" lang="en"' : "") + ">" + esc(it.title) + "</h3>" +
          (it.sub ? '<p class="sub">' + esc(it.sub) + "</p>" : "") +
          (it.specs && it.specs.length ? '<p class="specs">' + it.specs.map(esc).join(" · ") + "</p>" : "") +
          '<div class="buy">' + price +
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
        out += '<div class="grp-h"><h3>' + esc(g) + "</h3><span>" + fa(c) + " " + esc(unit) + "</span></div>";
      }
      out += card(it);
    });
    return out;
  }

  $("sections").insertAdjacentHTML("beforeend", C.sections.map(function (s) {
    var n = s.items.length;
    var head =
      '<div class="sec-head">' +
        (s.logo ? '<img class="logo" src="' + esc(s.logo) + '" alt="' + esc(s.brand) + '">' : "") +
        "<h2" + (isLatin(s.title) ? ' dir="ltr" lang="en"' : "") + ">" + esc(s.title) + "</h2>" +
        '<p class="brand">' + esc(s.brand) + (s.note ? " · " + esc(s.note) : "") + "</p>" +
        (n ? '<p class="meta">' + fa(n) + " " + esc(s.unit || "قطعه") + "</p>" : "") +
      "</div>";
    var body = n
      ? '<div class="items ' + (s.layout || "grid") + '">' + cards(s.items, s.unit || "قطعه") + "</div>"
      : '<div class="soon"><strong>به‌زودی</strong><p>فهرست قیمت این بخش به‌زودی اینجا قرار می‌گیرد.</p></div>';
    return '<section class="sec" id="' + s.id + '" aria-label="' + esc(s.nav) + '">' + head + body + "</section>";
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

  // ── my list (stored on this phone only) ─────────
  var KEY = "steelpop-list-v1";
  var list = [];
  try { list = JSON.parse(localStorage.getItem(KEY) || "[]").filter(function (c) { return byCode[c]; }); } catch (e) { list = []; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} }

  function sumOf(codes) {
    var s = 0, ask = false;
    codes.forEach(function (c) { var it = byCode[c]; if (typeof it.price === "number") s += it.price; else ask = true; });
    return { s: s, ask: ask };
  }

  function refresh() {
    document.querySelectorAll("[data-add]").forEach(function (b) {
      var it = byCode[b.getAttribute("data-add")];
      if (it.sold) return;
      var on = list.indexOf(it.code) > -1;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.textContent = on ? "✓ در لیست" : "+ لیست من";
    });
    var bar = $("listbar");
    bar.hidden = list.length === 0;
    document.body.classList.toggle("has-list", list.length > 0);
    $("listN").textContent = fa(list.length);
    var t = sumOf(list);
    $("listT").textContent = "جمع " + money(t.s).join(" ") + (t.ask ? " +" : "");
  }

  function renderSheet() {
    if (!list.length) {
      $("sheetBody").innerHTML = '<p class="hint">لیست شما خالی است.</p>';
      $("sheetTotal").textContent = fa(0);
      $("sheetUnit").textContent = "میلیون تومان";
      return;
    }
    var html = C.sections.map(function (s) {
      var codes = list.filter(function (c) { return byCode[c].sec === s; });
      if (!codes.length) return "";
      var st = sumOf(codes);
      return '<div class="grp"><h3>' + esc(s.nav) + " · " + esc(s.brand) + "</h3>" +
        codes.map(function (c) {
          var it = byCode[c];
          return '<div class="row' + (it.sold ? " sold" : "") + '">' +
            '<img src="' + esc(it.img) + '" alt="">' +
            "<div>" +
              '<div class="c">' + esc(it.code) + "</div>" +
              '<div class="tt"' + (isLatin(it.title) ? ' dir="ltr" lang="en"' : "") + ">" + esc(it.title) + "</div>" +
              '<div class="pp">' + (it.sub ? esc(it.sub) + " · " : "") +
                (typeof it.price === "number" ? money(it.price).join(" ") : "استعلام در غرفه") + "</div>" +
            "</div>" +
            '<button class="rm" type="button" data-rm="' + esc(c) + '" aria-label="حذف ' + esc(it.title) + ' از لیست">×</button>' +
          "</div>";
        }).join("") +
        (codes.length > 1 ? '<div class="sub-t">جمع این بخش: ' + money(st.s).join(" ") + "</div>" : "") +
        "</div>";
    }).join("");
    $("sheetBody").innerHTML = html;
    var t = sumOf(list);
    var tm = money(t.s);
    $("sheetTotal").textContent = tm[0] + (t.ask ? " +" : "");
    $("sheetUnit").textContent = tm[1];
  }

  var toastT;
  function toast(msg) {
    var el = $("toast");
    el.textContent = msg; el.classList.add("on");
    clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove("on"); }, 1600);
  }

  function openDialog(d) { if (d.showModal) d.showModal(); else d.setAttribute("open", ""); }
  function closeDialog(d) { if (d.close) d.close(); else d.removeAttribute("open"); }

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-add],[data-rm],[data-zoom],[data-close]") : null;
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
    } else if (t.hasAttribute("data-zoom")) {
      var it = byCode[t.getAttribute("data-zoom")];
      $("viewerImg").src = it.img; $("viewerImg").alt = it.title;
      openDialog($("viewer"));
    } else if (t.hasAttribute("data-close")) {
      closeDialog(t.closest("dialog"));
    }
  });

  $("viewer").addEventListener("click", function (e) { if (e.target === this || e.target.id === "viewerImg") closeDialog(this); });
  $("sheet").addEventListener("click", function (e) { if (e.target === this) closeDialog(this); });
  $("listbar").addEventListener("click", function () { renderSheet(); openDialog($("sheet")); });
  $("clearList").addEventListener("click", function () {
    if (!window.confirm("همه‌ی کالاها از لیست برداشته شوند؟")) return;
    list = []; save(); refresh(); closeDialog($("sheet"));
  });

  $("copyAddr").addEventListener("click", function () {
    var text = "BOOOM — " + ev.address;
    var done = function () { toast("نشانی کپی شد"); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(); });
    } else fallback();
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (err) {}
      document.body.removeChild(ta);
    }
  });

  refresh();
  if (location.hash) { var target = document.querySelector(location.hash); if (target) target.scrollIntoView(); }
})();
