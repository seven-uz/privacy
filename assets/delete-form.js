(function () {
  var CFG = window.__DEL || {};
  var EMAIL = "uzseven.uz@gmail.com";
  var APP = CFG.app || "";
  var SUBJ = CFG.subj || "Account deletion request";

  function lang() {
    var l = document.documentElement.getAttribute("data-lang");
    return (l === "ru" || l === "en") ? l : "uz";
  }

  var TYPE = {
    uz: { full: "To'liq — akkaunt va barcha ma'lumot o'chirilsin",
          data: "Faqat ma'lumot — akkaunt qolsin, yozuvlar o'chirilsin" },
    ru: { full: "Полностью — удалить аккаунт и все данные",
          data: "Только данные — аккаунт оставить, записи удалить" },
    en: { full: "Full — delete the account and all data",
          data: "Data only — keep the account, wipe the records" }
  };
  var LBL = {
    uz: { app: "Ilova", id: "Akkaunt identifikatori", name: "Ism-familiya", type: "So'rov turi",
          note: "Izoh",
          body: "Assalomu alaykum,\n\nQuyidagi ilovadagi akkauntimni va u bilan bog'liq shaxsiy ma'lumotlarimni o'chirishingizni so'rayman.\n",
          tail: "\nO'chirishni tasdiqlash uchun shu manzilga javob yozishingizni kutaman.\n\nHurmat bilan," },
    ru: { app: "Приложение", id: "Идентификатор аккаунта", name: "Имя и фамилия", type: "Тип запроса",
          note: "Комментарий",
          body: "Здравствуйте,\n\nПрошу удалить мой аккаунт в указанном ниже приложении и связанные с ним персональные данные.\n",
          tail: "\nЖду ответа на этот адрес для подтверждения удаления.\n\nС уважением," },
    en: { app: "App", id: "Account identifier", name: "Full name", type: "Request type",
          note: "Note",
          body: "Hello,\n\nI request the deletion of my account in the app below and of the personal data linked to it.\n",
          tail: "\nI look forward to your reply at this address to confirm the deletion.\n\nKind regards," }
  };

  function el(id) { return document.getElementById(id); }

  function buildBody() {
    var L = LBL[lang()];
    var t = el("f-type").value === "data" ? "data" : "full";
    var lines = [];
    lines.push(L.body);
    lines.push(L.app + ": " + APP);
    lines.push(L.id + ": " + (el("f-id").value || "-"));
    if (el("f-name").value) lines.push(L.name + ": " + el("f-name").value);
    lines.push(L.type + ": " + TYPE[lang()][t]);
    if (el("f-note").value) lines.push(L.note + ": " + el("f-note").value);
    lines.push(L.tail);
    return lines.join("\n");
  }

  function refreshTypeLabels() {
    var o = el("f-type").options;
    o[0].textContent = TYPE[lang()].full;
    o[1].textContent = TYPE[lang()].data;
    el("preview").textContent = buildBody();
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!el("f-type")) return;
    refreshTypeLabels();
    ["f-id", "f-name", "f-note"].forEach(function (id) {
      el(id).addEventListener("input", function () { el("preview").textContent = buildBody(); });
    });
    el("f-type").addEventListener("change", refreshTypeLabels);
    var langBtns = document.querySelectorAll("[data-setlang]");
    for (var i = 0; i < langBtns.length; i++) {
      langBtns[i].addEventListener("click", function () { setTimeout(refreshTypeLabels, 0); });
    }
    el("btn-mail").addEventListener("click", function () {
      if (!el("f-id").value.trim()) { el("need-id").hidden = false; el("f-id").focus(); return; }
      el("need-id").hidden = true;
      window.location.href = "mailto:" + EMAIL +
        "?subject=" + encodeURIComponent(SUBJ) +
        "&body=" + encodeURIComponent(buildBody());
    });
    el("btn-copy").addEventListener("click", function () {
      var txt = SUBJ + "\n\n" + buildBody();
      function done() { el("copy-ok").hidden = false; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done, function () { window.prompt(SUBJ, txt); });
      } else { window.prompt(SUBJ, txt); }
    });
  });
})();
