(function () {
  var KEY = "theme";
  var root = document.documentElement;

  function apply(t) {
    if (t === "dark" || t === "light") {
      root.setAttribute("data-theme", t);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function isDarkNow() {
    var explicit = root.getAttribute("data-theme");
    if (explicit === "dark") return true;
    if (explicit === "light") return false;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = isDarkNow() ? "light" : "dark";
      apply(next);
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {}
    });
  });
})();
