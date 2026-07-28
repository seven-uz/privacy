(function () {
  var KEY = "lang";
  var root = document.documentElement;
  var VALID = { uz: 1, ru: 1, en: 1 };

  function current() {
    var l = root.getAttribute("data-lang");
    return VALID[l] ? l : "uz";
  }

  function apply(l) {
    if (!VALID[l]) l = "uz";
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l);
    var btns = document.querySelectorAll("[data-setlang]");
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute("data-setlang") === l;
      btns[i].classList.toggle("on", on);
      btns[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
    try { localStorage.setItem(KEY, l); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(current());
    var btns = document.querySelectorAll("[data-setlang]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        apply(this.getAttribute("data-setlang"));
        if (history && history.replaceState) {
          history.replaceState(null, "", location.pathname + "?lang=" + current());
        }
      });
    }
  });
})();
