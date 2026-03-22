(function () {
  var FORM_NAME = "ask-her-out-response";

  function isIndexPage() {
    var path = window.location.pathname;
    return path === "/" || path === "/index.html" || path.endsWith("/");
  }

  function initStartTime() {
    if (isIndexPage()) {
      localStorage.setItem("askOutStartTime", Date.now().toString());
      localStorage.setItem("askOutLandedAt", new Date().toISOString());
    }
  }

  function getStartTime() {
    return parseInt(localStorage.getItem("askOutStartTime") || "0", 10);
  }

  function getLandedAt() {
    return localStorage.getItem("askOutLandedAt") || new Date().toISOString();
  }

  function submitResponse(choice, targetUrl) {
    var startTime = getStartTime();
    var timeTaken = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
    var landedAt = getLandedAt();

    var formData = new URLSearchParams();
    formData.append("form-name", FORM_NAME);
    formData.append("choice", choice);
    formData.append("time_taken_seconds", String(timeTaken));
    formData.append("landed_at", landedAt);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
      keepalive: true,
    }).catch(function () {});

    window.location.href = targetUrl;
  }

  function wireLinks() {
    initStartTime();

    document.querySelectorAll('a[href="yes.html"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        submitResponse("yes", "yes.html");
      });
    });

    document.querySelectorAll('a[href="no1.html"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        submitResponse("no1", "no1.html");
      });
    });

    document.querySelectorAll('a[href="no2.html"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        submitResponse("no2", "no2.html");
      });
    });

    document.querySelectorAll('a[href="no3.html"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        submitResponse("no3", "no3.html");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireLinks);
  } else {
    wireLinks();
  }
})();
