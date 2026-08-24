/* Full Dutch UI layer for EK Dashboard.
   Translates rendered text only (never app state), so filters, tab logic and
   vacancy/status detection keep working on the original values.
   Active whenever the language toggle is on NL (the app default); switching to
   EN restores the original English text. Extend TR/RULES below to adjust wording. */
(function () {
  var LANGKEY = "ek-dashboard-language";
  var TR = window.__EK_NL_DICT__ || {};
  var RULES = window.__EK_NL_RULES__ || [];
  var orig = new WeakMap();          // node/attr -> original English
  var pending = false;

  function isNL() {
    try { return localStorage.getItem(LANGKEY) !== "en"; } catch (e) { return true; }
  }
  function lookup(raw) {
    var s = raw.trim();
    if (!s) return null;
    var hit = TR[s];
    if (hit === undefined) {
      for (var i = 0; i < RULES.length; i++) {
        var re = RULES[i][0];
        re.lastIndex = 0;
        if (re.test(s)) { re.lastIndex = 0; hit = s.replace(re, RULES[i][1]); break; }
      }
    }
    if (hit === undefined || hit === null || hit === s) return null;
    return raw.replace(s, hit);          // keep original surrounding whitespace
  }
  function setText(node, val) {
    if (!orig.has(node)) orig.set(node, node.nodeValue);
    node.nodeValue = val;
  }
  var ATTRS = ["placeholder", "title", "aria-label", "alt"];

  function apply(root) {
    if (!root || root.nodeType === 3) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || /^(SCRIPT|STYLE|TEXTAREA|CANVAS)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        return n.nodeValue && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var n, list = [];
    while ((n = w.nextNode())) list.push(n);
    for (var i = 0; i < list.length; i++) {
      var out = lookup(list[i].nodeValue);
      if (out !== null) setText(list[i], out);
    }
    if (root.querySelectorAll) {
      var els = root.querySelectorAll("[" + ATTRS.join("],[") + "]");
      for (var j = 0; j < els.length; j++) {
        for (var k = 0; k < ATTRS.length; k++) {
          var a = ATTRS[k], v = els[j].getAttribute(a);
          if (!v) continue;
          var t = lookup(v);
          if (t !== null) {
            var key = els[j].__ekOrig || (els[j].__ekOrig = {});
            if (!(a in key)) key[a] = v;
            els[j].setAttribute(a, t);
          }
        }
      }
    }
  }

  function restore(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var n;
    while ((n = w.nextNode())) if (orig.has(n)) n.nodeValue = orig.get(n);
    var els = root.querySelectorAll ? root.querySelectorAll("*") : [];
    for (var i = 0; i < els.length; i++) {
      var o = els[i].__ekOrig;
      if (o) for (var a in o) els[i].setAttribute(a, o[a]);
    }
  }

  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; if (isNL()) apply(document.body); });
  }

  function start() {
    if (!document.body) return setTimeout(start, 20);
    if (isNL()) apply(document.body);
    new MutationObserver(function (muts) {
      if (!isNL()) return;
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === "characterData") { var o = lookup(m.target.nodeValue); if (o !== null) setText(m.target, o); }
        else schedule();
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
    // language toggle: put the English back when the user switches to EN
    var last = isNL();
    new MutationObserver(function () {
      var now = isNL();
      if (now === last) return;
      last = now;
      if (now) apply(document.body); else restore(document.body);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
  start();
})();
