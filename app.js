(function () {
  var currentScreen = 0;
  var form = document.querySelector('form[name="ask-out-log"]');

  function getStartTime() {
    return parseInt(localStorage.getItem("askOutStartTime") || "0", 10);
  }
  function getLandedAt() {
    return localStorage.getItem("askOutLandedAt") || new Date().toISOString();
  }

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach(function (s) {
      s.classList.remove("active");
    });
    var screen = document.querySelector('.screen[data-screen="' + id + '"]');
    if (screen) screen.classList.add("active");
  }

  function submitForm(choice) {
    var startTime = getStartTime();
    var timeTaken = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
    var landedAt = getLandedAt();

    form.querySelector('[name="choice"]').value = choice;
    form.querySelector('[name="time_taken_seconds"]').value = String(timeTaken);
    form.querySelector('[name="landed_at"]').value = landedAt;
    form.querySelector('[name="x"]').value = "";
    form.target = "netlify-form-frame";
    form.action = document.location.origin + "/";
    form.submit();
  }

  function onChoice(choice) {
    if (choice === "yes") {
      submitForm("yes");
      localStorage.removeItem("askOutStartTime");
      localStorage.removeItem("askOutLandedAt");
      showScreen("yes");
    } else {
      currentScreen += 1;
      submitForm("no" + currentScreen);
      if (currentScreen <= 3) {
        showScreen(currentScreen);
        if (currentScreen === 3) initMovingNo();
      }
    }
  }

  function initMovingNo() {
    var btn = document.getElementById("move-random");
    if (btn) {
      btn.addEventListener("mouseenter", function (e) {
        var el = e.target;
        el.style.position = "absolute";
        el.style.top = Math.floor(Math.random() * 90 + 5) + "%";
        el.style.left = Math.floor(Math.random() * 90 + 5) + "%";
      });
    }
  }

  function wireButtons() {
    localStorage.setItem("askOutStartTime", Date.now().toString());
    localStorage.setItem("askOutLandedAt", new Date().toISOString());

    document.querySelectorAll("[data-choice]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        onChoice(btn.getAttribute("data-choice"));
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireButtons);
  } else {
    wireButtons();
  }
})();
