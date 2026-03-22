(function () {
  var DISCORD_WEBHOOK = typeof window !== "undefined" ? window.DISCORD_WEBHOOK : "";

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

    var msg =
      "**Ask Out**\nChoice: " +
      choice +
      "\nTime: " +
      timeTaken +
      " seconds" +
      (landedAt ? "\nLanded: " + landedAt : "");

    function go() {
      window.location.href = targetUrl;
    }

    if (DISCORD_WEBHOOK && DISCORD_WEBHOOK.indexOf("discord.com/api/webhooks") !== -1) {
      fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: msg }),
      })
        .then(go)
        .catch(go);
    } else {
      go();
    }
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
