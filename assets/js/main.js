/* AdyDaddy | site interactions */
(function () {
  "use strict";

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      if (header) header.classList.toggle("menu-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    mainNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.classList.remove("open");
        if (header) header.classList.remove("menu-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Active nav link ---------- */
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-link[data-nav]").forEach(function (a) {
    if (a.getAttribute("data-nav").toLowerCase() === page) a.classList.add("active");
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Stat counters ---------- */
  function animateCount(el) {
    var raw = el.getAttribute("data-count"); // e.g. "1.8"
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    var decimals = (raw.split(".")[1] || "").length;
    var target = parseFloat(raw);
    if (isNaN(target)) { el.textContent = prefix + raw + suffix; return; }
    var dur = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = prefix + val.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    if (!q) return;
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (o) {
        o.classList.remove("open");
        var a = o.querySelector(".faq-a");
        if (a) a.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        var ans = item.querySelector(".faq-a");
        if (ans) ans.style.maxHeight = ans.scrollHeight + "px";
      }
    });
  });

  /* ---------- Quote slider ---------- */
  var slider = document.getElementById("quoteSlider");
  if (slider) {
    var slides = slider.querySelectorAll(".quote-slide");
    var dots = document.querySelectorAll(".quote-dot");
    var idx = 0;
    var timer = null;
    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("active", i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle("active", i === idx); });
    }
    dots.forEach(function (d) {
      d.addEventListener("click", function () { go(parseInt(d.getAttribute("data-i"), 10)); restart(); });
    });
    function restart() { if (timer) clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 6000); }
    if (slides.length > 1) restart();
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (f) {
        var val = f.value.trim();
        var bad = !val;
        if (bad && f.type === "email") bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        f.style.borderColor = bad ? "var(--red)" : "";
        if (bad) ok = false;
      });
      if (!ok) return;

      var data = new FormData(form);
      var btn = form.querySelector("button[type=submit]");
      var originalHTML = btn ? btn.innerHTML : null;
      if (btn) { btn.disabled = true; btn.innerHTML = "Sending..."; }

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: "f83e7122-0175-45fa-a55a-af50e950c60c",
          subject: "New enquiry from " + (data.get("name") || "AdyDaddy website"),
          from_name: "AdyDaddy Website",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          brand: data.get("brand"),
          revenue: data.get("revenue"),
          message: data.get("message")
        })
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.success) {
            var success = document.getElementById("formSuccess");
            form.style.display = "none";
            if (success) success.classList.add("show");
          } else {
            throw new Error("submit failed");
          }
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.innerHTML = originalHTML; }
          var err = document.getElementById("formError");
          if (err) err.classList.add("show");
        });
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
