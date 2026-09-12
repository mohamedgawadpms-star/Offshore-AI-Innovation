/*
 * app.js — Offshore AI Solutions
 * Version: 1.2.1 | Revision: R6 | Updated: 2026-09-09
 * CONTENTS
 * 01 CONFIG & CONSTANTS
 * 02 APPLICATION STATE
 * 03 PERSISTENCE / REPOSITORY
 * 04 DOMAIN LOGIC & CALCULATIONS
 * 05 VALIDATION
 * 06 RENDERING
 * 07 HOME
 * 13 EVENT HANDLERS
 * 14 INITIALISATION
 * CHANGELOG: 1.2.1 — Brighter photograph, white navigation, and light content surfaces. Previous: 1.2.1 — Navigation, typography, optimized photograph, recognition and verified certificate downloads. Previous: 1.2.1 — Updated opening headline. Previous: 1.1.1 — Added LinkedIn profile link. Previous: 1.1.0 — Added email and two WhatsApp contact links. Previous: 1.0.0 — Initial portfolio; accessible background motion.
 */
(function () {
  "use strict";
  // ============================================================= //
  // SECTION 01 — CONFIG & CONSTANTS
  // ============================================================= //
  const APP_CONFIG = Object.freeze({ version: "1.2.1", reducedMotionQuery: "(prefers-reduced-motion: reduce)" });
  const DOM = { body: document.body, motionButton: document.getElementById("motion-button"), menuButton: document.getElementById("menu-button"), navigation: document.getElementById("main-navigation"), awardOpen: document.getElementById("award-open"), awardClose: document.getElementById("award-close"), awardDialog: document.getElementById("award-dialog") };
  // ============================================================= //
  // SECTION 02 — APPLICATION STATE
  // ============================================================= //
  // Event handlers own session-only presentation preferences.
  const state = { userPaused: false, reducedMotion: true, menuOpen: false };
  // ============================================================= //
  // SECTION 03 — PERSISTENCE / REPOSITORY
  // ============================================================= //
  // No personal data or preferences are persisted in this review version.
  // ============================================================= //
  // SECTION 04 — DOMAIN LOGIC & CALCULATIONS
  // ============================================================= //
  // Boolean preference inputs -> whether decorative motion is permitted.
  function isMotionAllowed(preferences) { return !preferences.userPaused && !preferences.reducedMotion; }
  // ============================================================= //
  // SECTION 05 — VALIDATION
  // ============================================================= //
  function validateStartup() { return Boolean(DOM.body && DOM.motionButton && typeof window.matchMedia === "function"); }
  // ============================================================= //
  // SECTION 06 — RENDERING
  // ============================================================= //
  function renderMenu() { DOM.body.classList.toggle("is-menu-open", state.menuOpen); DOM.menuButton.setAttribute("aria-expanded", String(state.menuOpen)); DOM.menuButton.textContent = state.menuOpen ? "Close menu" : "Menu"; }
  function renderMotion() {
    const playing = isMotionAllowed(state);
    DOM.body.classList.toggle("is-motion-active", playing);
    DOM.motionButton.hidden = state.reducedMotion;
    DOM.motionButton.setAttribute("aria-pressed", String(!playing));
    DOM.motionButton.textContent = playing ? "Pause background motion" : "Resume background motion";
  }
  // ============================================================= //
  // SECTION 07 — HOME
  // ============================================================= //
  // The photo is decorative; the complete biography remains available without JS.
  // ============================================================= //
  // SECTION 13 — EVENT HANDLERS
  // ============================================================= //
  function bindEvents(motionPreference) {
    DOM.menuButton.hidden = false;
    DOM.body.classList.add("has-menu");
    DOM.menuButton.addEventListener("click", function () { state.menuOpen = !state.menuOpen; renderMenu(); });
    DOM.navigation.addEventListener("click", function (event) { if (event.target.closest("a")) { state.menuOpen = false; renderMenu(); } });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape" && state.menuOpen) { state.menuOpen = false; renderMenu(); DOM.menuButton.focus(); } });
    DOM.awardOpen.addEventListener("click", function (event) { event.preventDefault(); DOM.awardDialog.showModal(); });
    DOM.awardClose.addEventListener("click", function () { DOM.awardDialog.close(); });
    DOM.motionButton.addEventListener("click", function () { state.userPaused = !state.userPaused; renderMotion(); });
    motionPreference.addEventListener("change", function (event) { state.reducedMotion = event.matches; renderMotion(); });
  }
  // ============================================================= //
  // SECTION 14 — INITIALISATION
  // ============================================================= //
  function initialize() {
    if (!validateStartup()) { console.warn("Motion controls unavailable. Static portfolio remains available."); return; }
    try {
      const motionPreference = window.matchMedia(APP_CONFIG.reducedMotionQuery);
      state.reducedMotion = motionPreference.matches;
      bindEvents(motionPreference);
      renderMotion();
    } catch (error) {
      DOM.body.classList.remove("is-motion-active");
      DOM.motionButton.hidden = true;
      console.error("Background motion unavailable; using a static background.", error);
    }
  }
  initialize();
})();




