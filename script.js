(function() {
    console.log("[Baked] Forwarding to the actual script...");

    let script = document.createElement("script");
    script.src = "https://raw.githubusercontent.com/username/repository/branch/script.js"; // Replace with your actual GitHub raw URL
    script.onload = function() {
        console.log("[Baked] Script loaded successfully!");
    };
    script.onerror = function() {
        console.error("[Baked] Failed to load script.");
    };
    
    document.body.appendChild(script);
})();
