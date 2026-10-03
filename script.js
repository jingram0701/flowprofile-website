/* ============================================================
   FLOW PROFILE — SITE BEHAVIOUR
   You should not need to edit this file. Business details live in config.js.
   ============================================================ */
(function () {
  var S = window.SITE || {};

  /* ---- Fill in business details from config.js ---- */
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site");
    var value = S[key];
    if (value) {
      el.textContent = (el.getAttribute("data-prefix") || "") + value;
    } else if (!el.textContent) {
      // nothing in config and no fallback text: hide the empty element's parent line
      var line = el.closest("p, div, li");
      if (line) line.hidden = true;
    }
  });

  document.querySelectorAll("[data-tel]").forEach(function (a) {
    if (S.phoneDial) a.href = "tel:" + S.phoneDial; else a.hidden = true;
  });
  document.querySelectorAll("[data-mail]").forEach(function (a) {
    if (S.email) a.href = "mailto:" + S.email; else a.hidden = true;
  });
  document.querySelectorAll("[data-social]").forEach(function (a) {
    var url = S[a.getAttribute("data-social")];
    if (url) { a.href = url; a.hidden = false; a.target = "_blank"; a.rel = "noopener"; }
  });

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  if (S.siteUrl) {
    var og = document.querySelector('meta[property="og:url"]') || document.createElement("meta");
    og.setAttribute("property", "og:url");
    og.setAttribute("content", S.siteUrl);
    document.head.appendChild(og);
  }

  /* ---- Keep anchor links clear of the sticky header ---- */
  var header = document.querySelector(".site-header");
  function setHeaderHeight() {
    if (header) document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  }
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);
  window.addEventListener("load", setHeaderHeight);

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Quote form ---- */
  var form = document.getElementById("quote-form");
  if (!form) return;
  var status = form.querySelector(".form-status");
  var button = form.querySelector('button[type="submit"]');

  function setStatus(msg, isError) {
    status.textContent = msg;
    status.classList.toggle("error", !!isError);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    setStatus("");

    // Basic checks: name and phone are required
    var ok = true;
    ["f-name", "f-phone"].forEach(function (id) {
      var input = document.getElementById(id);
      var valid = input.value.trim().length > 0;
      input.setAttribute("aria-invalid", valid ? "false" : "true");
      if (!valid) ok = false;
    });
    if (!ok) { setStatus("Please add your name and a phone number so we can get back to you.", true); return; }

    var data = new FormData(form);
    if (data.get("_gotcha")) return; // spam bot filled the hidden field

    // No Formspree ID yet: open the visitor's email app with the details filled in
    if (!S.formspreeId) {
      var lines = [
        "Name: " + data.get("name"),
        "Phone: " + data.get("phone"),
        "Email: " + data.get("email"),
        "Suburb: " + data.get("suburb"),
        "Service: " + data.get("service"),
        "",
        data.get("message")
      ];
      var subject = "Quote request from " + data.get("name");
      window.location.href = "mailto:" + (S.email || "") +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      setStatus("Your email app should open with the details filled in. If it does not, call us instead.");
      return;
    }

    // Formspree is set up: send in the background
    button.disabled = true;
    setStatus("Sending…");
    data.append("_subject", "Quote request from " + data.get("name"));
    fetch("https://formspree.io/f/" + S.formspreeId, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    }).then(function (res) {
      if (res.ok) {
        form.reset();
        setStatus("Sent. We will be in touch within one business day.");
      } else {
        setStatus("That did not send. Please call us or email " + (S.email || "us") + ".", true);
      }
    }).catch(function () {
      setStatus("That did not send. Please call us or email " + (S.email || "us") + ".", true);
    }).finally(function () {
      button.disabled = false;
    });
  });
})();
