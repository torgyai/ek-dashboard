/* Gedeelde bouwstenen voor de werkruimtes die op de blueprint zijn gebaseerd.
   Elke module levert alleen data en een render; koppen, tabellen, tabs,
   knoppen, taalwissel en de hertekenlus komen hiervandaan. */
(function () {
  function T(nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); }
  function lang() { return window.__EK_LANG ? window.__EK_LANG() : "nl"; }
  function loc() { return lang() === "en" ? "en-GB" : "nl-NL"; }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function EUR(n, d) {
    return new Intl.NumberFormat(loc(), { style: "currency", currency: "EUR", minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }).format(n);
  }
  function EUR2(n) { return EUR(n, 2); }
  function K(n) {
    var a = Math.abs(n);
    if (a >= 1e6) return (n / 1e6).toLocaleString(loc(), { maximumFractionDigits: 1 }) + " mln";
    if (a >= 1e3) return (n / 1e3).toLocaleString(loc(), { maximumFractionDigits: 0 }) + "k";
    return NUM(n);
  }
  function EURK(n) { return "€ " + K(n); }
  function NUM(n, d) { return new Intl.NumberFormat(loc(), { maximumFractionDigits: d == null ? 0 : d }).format(n); }
  function PCT(n, d) { return NUM(n, d == null ? 1 : d) + "%"; }
  function DATE(iso) {
    var p = String(iso).split("-");
    if (p.length !== 3) return iso;
    if (lang() === "en") return p[2] + " " + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][+p[1] - 1] + " " + p[0];
    return p[2] + "-" + p[1] + "-" + p[0];
  }
  function MONTH(iso) {
    var p = String(iso).split("-");
    var nl = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
    var en = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (lang() === "en" ? en : nl)[+p[1] - 1] + " " + p[0];
  }

  /* --------- bouwstenen --------- */
  function head(o) {
    return '<section class="flex flex-col gap-5 border-b border-slate-300 pb-5 md:flex-row md:items-end md:justify-between">' +
      '<div><p class="ek-lbl">' + esc(o.eyebrow) + '</p>' +
      '<h2 class="mt-2 text-[32px] font-semibold tracking-[-0.055em] text-[#13263a]">' + esc(o.title) + '</h2>' +
      (o.intro ? '<p class="mt-2 max-w-2xl ek-p">' + o.intro + '</p>' : "") + '</div>' +
      (o.chip ? '<span class="ek-chip">' + esc(o.chip) + '</span>' : "") + '</section>';
  }
  function kpis(rows, cols) {
    return '<section class="ek-mt ek-g ek-g' + (cols || rows.length || 4) + '">' + rows.map(function (r) {
      return '<article class="ek-card"><p class="ek-lbl">' + esc(r[0]) + '</p>' +
        '<p class="ek-val">' + esc(r[1]) + '</p>' +
        (r[2] ? '<p class="ek-sub">' + esc(r[2]) + '</p>' : "") +
        (r[3] != null ? '<div class="ek-bar ek-mt-s"><span style="width:' + Math.max(0, Math.min(100, r[3])) + '%"></span></div>' : "") +
        '</article>';
    }).join("") + '</section>';
  }
  function tabs(items, active, attr) {
    return '<div class="ek-tabs">' + items.map(function (i) {
      return '<button type="button" class="ek-tab' + (i.id === active ? " ek-on" : "") + '" ' + attr + '="' + esc(i.id) + '">' +
        esc(i.label) + (i.count != null ? " · " + i.count : "") + '</button>';
    }).join("") + '</div>';
  }
  function btns(list) {
    return '<div class="ek-btns">' + list.map(function (b) {
      if (!b) return "";
      return '<button type="button" class="ek-btn' + (b.primary ? " ek-btn-primary" : "") + (b.danger ? " ek-btn-danger" : "") + (b.off ? " ek-off" : "") + '"' +
        (b.attr ? " " + b.attr : "") + '>' + esc(b.label) + '</button>';
    }).join("") + '</div>';
  }
  function chip(label, tone) { return '<span class="ek-chip' + (tone ? " ek-" + tone : "") + '">' + esc(label) + '</span>'; }
  function panel(title, body, right) {
    return '<section class="ek-panel">' +
      '<header class="ek-panel-head"><p class="ek-lbl">' + esc(title) + '</p>' + (right || "") + '</header>' +
      body + '</section>';
  }
  function table(cols, rows, opts) {
    opts = opts || {};
    return '<div class="ek-scroll"><table class="ek-tbl"><thead><tr>' +
      cols.map(function (c) { return '<th' + (c.num ? ' class="ek-num"' : "") + '>' + esc(c.label) + '</th>'; }).join("") +
      '</tr></thead><tbody>' + rows.map(function (r) {
        var cells = r.cells || r;
        return '<tr' + (r.attr ? " " + r.attr : "") + (r.on ? ' class="ek-on"' : "") + (r.total ? ' class="ek-tbl-total"' : "") + '>' +
          cells.map(function (c, i) { return '<td' + (cols[i] && cols[i].num ? ' class="ek-num"' : "") + '>' + (c == null ? "" : c) + '</td>'; }).join("") + '</tr>';
      }).join("") + '</tbody>' + (opts.foot || "") + '</table></div>';
  }
  function kv(pairs) {
    return '<dl class="ek-kv">' + pairs.map(function (p) {
      return '<dt>' + esc(p[0]) + '</dt><dd>' + (p[1] == null ? "" : p[1]) + '</dd>';
    }).join("") + '</dl>';
  }
  function flow(steps, current) {
    return '<div class="ek-flow">' + steps.map(function (s, i) {
      var cls = i < current ? " ek-done" : (i === current ? " ek-now" : "");
      return (i ? '<span class="ek-arrow">→</span>' : "") + '<span class="ek-step' + cls + '">' + esc(s) + '</span>';
    }).join("") + '</div>';
  }
  function ai(title, body) {
    return '<section class="ek-ai"><p class="ek-lbl">' + esc(title) + '</p>' +
      '<div class="ek-mt-s ek-p">' + body + '</div></section>';
  }
  function note(txt) { return '<p class="ek-mt ek-note">' + txt + '</p>'; }

  /* --------- hertekenlus --------- */
  function mount(rootId, api) {
    function vul() {
      var root = document.getElementById(rootId);
      if (!root) return;
      var stamp = lang() + "|" + (api.stamp ? api.stamp() : "");
      if (root.dataset.gevuld === stamp) return;
      root.dataset.gevuld = stamp;
      root.innerHTML = api.html();
      if (!root.dataset.klik) {
        root.dataset.klik = "1";
        root.addEventListener("click", function (e) { if (api.click && api.click(e)) vul(); });
        root.addEventListener("change", function (e) { if (api.change && api.change(e)) vul(); });
        root.addEventListener("input", function (e) { if (api.input) api.input(e); });
      }
    }
    function start() {
      if (!document.body) return setTimeout(start, 20);
      vul();
      if (window.__EK_ONLANG) window.__EK_ONLANG(vul);
      var wacht = false;
      new MutationObserver(function () {
        if (wacht) return;
        wacht = true;
        requestAnimationFrame(function () { wacht = false; vul(); });
      }).observe(document.body, { childList: true, subtree: true });
    }
    start();
  }

  /* kleine hulp: welk element is aangeklikt */
  function hit(e, attr) {
    var el = e.target.closest("[" + attr + "]");
    return el ? el.getAttribute(attr) : null;
  }

  window.EKUI = {
    T: T, lang: lang, loc: loc, esc: esc,
    EUR: EUR, EUR2: EUR2, EURK: EURK, K: K, NUM: NUM, PCT: PCT, DATE: DATE, MONTH: MONTH,
    head: head, kpis: kpis, tabs: tabs, btns: btns, chip: chip, panel: panel,
    table: table, kv: kv, flow: flow, ai: ai, note: note, mount: mount, hit: hit
  };
})();
