(function() {
    console.log("[Baked] Mod Loaded!");

    // Function to create the mod menu
    function createModMenu() {
        let menu = document.createElement("div");
        menu.style.position = "fixed";
        menu.style.top = "10px";
        menu.style.left = "10px";
        menu.style.background = "rgba(0,0,0,0.8)";
        menu.style.color = "white";
        menu.style.padding = "10px";
        menu.style.borderRadius = "5px";
        menu.style.zIndex = "10000";
        menu.innerHTML = `
            <h3>Baked Mod Menu</h3>
            <button id="autoClicker">Auto Click</button>
            <button id="autoUpgrade">Auto Upgrade</button>
            <button id="goldenClick">Auto Golden Cookie</button>
            <button id="ruinGame">Ruin the Game</button>
        `;
        document.body.appendChild(menu);

        // Auto Clicker
        document.getElementById("autoClicker").onclick = function() {
            setInterval(() => {
                Game.ClickCookie();
            }, 1); // Clicks every millisecond
        };

        // Auto Upgrade
        document.getElementById("autoUpgrade").onclick = function() {
            setInterval(() => {
                for (let i in Game.UpgradesInStore) {
                    Game.UpgradesInStore[i].buy();
                }
            }, 1000); // Buys upgrades every second
        };

        // Auto Golden Cookie Clicker
        document.getElementById("goldenClick").onclick = function() {
            setInterval(() => {
                let goldenCookie = document.querySelector(".shimmer");
                if (goldenCookie) goldenCookie.click();
            }, 500);
        };

        // Ruin the Game (Cheat)
        document.getElementById("ruinGame").onclick = function() {
            if (confirm("These cookies will taste bitter! Do you want to continue?")) {
                Game.RuinTheFun(); // Built-in Cookie Clicker cheat
            }
        };
    }

    // Wait for the game to load, then create the mod menu
    let checkGameLoaded = setInterval(() => {
        if (Game && Game.ready) {
            clearInterval(checkGameLoaded);
            createModMenu();
        }
    }, 500);
})();

