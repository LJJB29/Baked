(function() {
    console.log("[Baked] Mod Loaded! Waiting for Cookie Clicker...");

    // Wait until the game is fully loaded
    let checkGameLoaded = setInterval(() => {
        if (typeof Game !== "undefined" && Game.ready) {
            clearInterval(checkGameLoaded);
            console.log("[Baked] Game Loaded! Injecting mod menu...");
            createModMenu();
        }
    }, 1000);

    function createModMenu() {
        // Create mod menu UI
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
            <button id="autoClicker">Auto Click</button>
            <button id="autoUpgrade">Auto Upgrade</button>
            <button id="autoGolden">Auto Golden Cookie</button>
            <button id="autoBuyBuildings">Auto Buy Buildings</button>
            <button id="ruinGame">Ruin the Game</button>
            <br><br>
            <input type="number" id="customCookies" placeholder="Set Custom Cookies">
            <button id="setCookies">Set Cookies</button>
            <br><br>
            <button id="spawnAllAchievements">Unlock All Achievements</button>
            <button id="spawnAllUpgrades">Unlock All Upgrades</button>
            <br><br>
            <button id="customAchievement1">Unlock Custom Achievement 1</button>
            <button id="customAchievement2">Unlock Custom Achievement 2</button>
            <br><br>
            <button id="generateRandomCookies">Generate Random Cookies</button>
            <button id="maxBuildings">Max Out All Buildings</button>
            <button id="generateRandomUpgrades">Generate Random Upgrades</button>
            <button id="superCookieBoost">Super Cookie Boost</button>
            <br><br>
            <button id="noCookieLimit">No Cookie Limit</button>
            <button id="disableSugarLumps">Disable Sugar Lumps</button>
            <button id="saveAllProgress">Save All Progress</button>
        `;
        document.body.appendChild(menu);

        // Auto Clicker: Clicks the cookie every millisecond
        document.getElementById("autoClicker").onclick = function() {
            setInterval(() => {
                Game.ClickCookie();
            }, 1);
            console.log("[Baked] Auto Clicker Enabled");
        };

        // Auto Upgrade: Buys upgrades from the store every second
        document.getElementById("autoUpgrade").onclick = function() {
            setInterval(() => {
                for (let i in Game.UpgradesInStore) {
                    Game.UpgradesInStore[i].buy();
                }
            }, 1000);
            console.log("[Baked] Auto Upgrade Enabled");
        };

        // Auto Golden Cookie Clicker: Clicks golden cookies every half second
        document.getElementById("autoGolden").onclick = function() {
            setInterval(() => {
                let goldenCookie = document.querySelector(".shimmer");
                if (goldenCookie) goldenCookie.click();
            }, 500);
            console.log("[Baked] Auto Golden Cookie Clicker Enabled");
        };

        // Auto Buy Buildings: Randomly buys a building if enough cookies are available
        document.getElementById("autoBuyBuildings").onclick = function() {
            setInterval(() => {
                let buildings = Object.keys(Game.Objects); // Get all building names
                let randomBuilding = Game.Objects[buildings[Math.floor(Math.random() * buildings.length)]];
                if (randomBuilding && Game.cookies >= randomBuilding.price) {
                    randomBuilding.buy();
                    console.log(`[Baked] Bought ${randomBuilding.name}`);
                }
            }, 1000);
            console.log("[Baked] Auto Buy Buildings Enabled");
        };

        // Ruin the Game: Activates a game-breaking cheat
        document.getElementById("ruinGame").onclick = function() {
            if (confirm("These cookies will taste bitter! Do you want to continue?")) {
                Game.RuinTheFun();
                console.log("[Baked] Game Ruined!");
            }
        };

        // Set Custom Cookies: Set a specific number of cookies
        document.getElementById("setCookies").onclick = function() {
            let customAmount = parseInt(document.getElementById("customCookies").value);
            if (!isNaN(customAmount) && customAmount >= 0) {
                Game.cookies = customAmount; // Set custom amount of cookies
                Game.cookiesEarned = customAmount; // Update the cookies earned tracker
                Game.UpdateCookieDisplay(); // Refresh the display
                console.log(`[Baked] Set cookies to ${customAmount}`);
            } else {
                alert("Please enter a valid number.");
            }
        };

        // Unlock all achievements
        document.getElementById("spawnAllAchievements").onclick = function() {
            for (let i in Game.Achievements) {
                Game.Achievements[i].unlock();
                console.log(`[Baked] Unlocked Achievement: ${Game.Achievements[i].name}`);
            }
            console.log("[Baked] All achievements unlocked!");
        };

        // Unlock all upgrades
        document.getElementById("spawnAllUpgrades").onclick = function() {
            for (let i in Game.Upgrades) {
                Game.Upgrades[i].unlock();
                console.log(`[Baked] Unlocked Upgrade: ${Game.Upgrades[i].name}`);
            }
            console.log("[Baked] All upgrades unlocked!");
        };

        // Custom Achievement 1: Trigger a custom achievement
        document.getElementById("customAchievement1").onclick = function() {
            let achievement = {
                name: "Cookie Overlord",
                description: "You've clicked the cookie more times than the gods intended!",
                unlock: function() {
                    console.log("[Baked] Unlocked Custom Achievement 1: Cookie Overlord");
                }
            };
            // Simulate unlocking this achievement by calling its unlock method
            achievement.unlock();
        };

        // Custom Achievement 2: Trigger another custom achievement
        document.getElementById("customAchievement2").onclick = function() {
            let achievement = {
                name: "Cookie Tycoon",
                description: "You have accumulated an absurd amount of cookies.",
                unlock: function() {
                    console.log("[Baked] Unlocked Custom Achievement 2: Cookie Tycoon");
                }
            };
            // Simulate unlocking this achievement by calling its unlock method
            achievement.unlock();
        };

        // Generate Random Cookies: Generate a random amount of cookies
        document.getElementById("generateRandomCookies").onclick = function() {
            let randomCookies = Math.floor(Math.random() * 10000000000);
            Game.cookies = randomCookies;
            Game.cookiesEarned = randomCookies;
            Game.UpdateCookieDisplay();
            console.log(`[Baked] Generated Random Cookies: ${randomCookies}`);
        };

        // Max Out All Buildings: Buy the max number of each building
        document.getElementById("maxBuildings").onclick = function() {
            for (let buildingKey in Game.Objects) {
                let building = Game.Objects[buildingKey];
                while (Game.cookies >= building.price) {
                    building.buy();
                }
                console.log(`[Baked] Maxed Out Building: ${building.name}`);
            }
        };

        // Generate Random Upgrades: Unlock random upgrades
        document.getElementById("generateRandomUpgrades").onclick = function() {
            let upgradeIndex = Math.floor(Math.random() * Game.Upgrades.length);
            Game.Upgrades[upgradeIndex].unlock();
            console.log(`[Baked] Unlocked Random Upgrade: ${Game.Upgrades[upgradeIndex].name}`);
        };

        // Super Cookie Boost: Boost cookies to a massive amount
        document.getElementById("superCookieBoost").onclick = function() {
            Game.cookies = 1000000000000000;
            Game.cookiesEarned = 1000000000000000;
            Game.UpdateCookieDisplay();
            console.log("[Baked] Super Cookie Boost Activated!");
        };

        // No Cookie Limit: Remove cookie limit
        document.getElementById("noCookieLimit").onclick = function() {
            Game.cookieLimit = Infinity; // Set no limit
            console.log("[Baked] Cookie limit removed.");
        };

        // Disable Sugar Lumps: Disable the sugar lumps system
        document.getElementById("disableSugarLumps").onclick = function() {
            Game.sugarLumps = 0; // Set sugar lumps to 0
            Game.UpdateSugarLumpDisplay();
            console.log("[Baked] Sugar lumps system disabled.");
        };

        // Save All Progress: Save the game state
        document.getElementById("saveAllProgress").onclick = function() {
            Game.WriteSave();
            console.log("[Baked] Progress saved!");
        };

        // Hook into the game's achievement unlock process to log it to the console
        let originalUnlockAchievement = Game.Achievements.unlock;
        Game.Achievements.unlock = function(achievement) {
            originalUnlockAchievement.call(Game.Achievements, achievement);
            console.log(`[Baked] Unlocked Achievement: ${achievement.name}`);
        };
    }
})();

