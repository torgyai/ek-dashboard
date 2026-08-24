/* Klein label dat aangeeft dat dit een demonstratieomgeving met fictieve gegevens is.
   Subtiel, onderin de zijbalk; verdwijnt niet uit beeld bij het scrollen. */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };
  function tekst() { return T("Demonstratieomgeving · fictieve gegevens", "Demonstration environment · illustrative data"); }
  function zet() {
    var el = document.getElementById("ek-demo-label");
    if (!el) {
      el = document.createElement("div");
      el.id = "ek-demo-label";
      document.body.appendChild(el);
    }
    if (el.textContent !== tekst()) el.textContent = tekst();
  }
  function start() {
    if (!document.body) return setTimeout(start, 20);
    zet();
    if (window.__EK_ONLANG) window.__EK_ONLANG(zet);
    setInterval(zet, 2000);
  }
  start();
})();
