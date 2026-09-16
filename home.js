(() => {
  "use strict";

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {
        // The catalog stays usable online if offline support is unavailable.
      });
    });
  }
})();
