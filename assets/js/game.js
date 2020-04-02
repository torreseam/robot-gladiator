// Game States
//wrap game logic in startGame() function
//when player defeat or no more enemy, call endGame() function
// *alerts player total stats
// *ask if player wants to play again
// **if yes, call startGame()
//after player skip/defeat enemy
// *ask player if they want to shop
// *if no, continue as normal
// * in shop(), ask player 'refill health, 'upgrade attack', or 'leave shop'
// if refill, subtract money points from player and increase health
// if leave, alert goodbye and exit function
// if any other ivalid option, call shop() again



var fight = function(enemy) {
    while(enemy.health > 0 && playerInfo.health > 0) {
        // Fight or Skip prompt
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'Fight' or 'Skip' to choose.");

            // If user picks "skip" confirm and stop loop
            if (promptFight === "skip" || promptFight === "SKIP") {
                // Confirm user wants to skip
                var confirmSkip = window.confirm("Are you sure you'd like to quit?");

                // If yes (true), leave fight
                if (confirmSkip) {
                    window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                    // Subtract money from playerInfo.money for skipping
                    playerInfo.money = Math.max(0, playerInfo.money - 10);
                    console.log("playerInfo.money", playerInfo.money)
                    break;
                }
            }

            // Remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            // Log a resulting message to the console so we know that it worked.
        console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

            // Check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " had died!");

                // Award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // Leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " healthy left.");
            }

            // Subtract the value of 'enemy.attack' from the value of 'playerInfo.health and use that result to update the value in the 'playerInfo.health' variable.
        var damage = randomNumber(enemy.attack -3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            // Log a resulting message to the console so we know that it worked. 
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            // Check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            // Leave while() loop if player is dead
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

var startGame = function() {
    playerInfo.reset();
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let user know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            // Ask user to enter store
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
            // If yes, take them to the store()
            if (storeConfirm) {
                shop();
            }
        
            // pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];
        
            // reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
        
            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);
            // If we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                shop();
            }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
        // play again
        endGame();
    }
};

var endGame = function() {
    // If player is still alive
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    // Ask player what they'd like to do
    var shopOptionPrompt = window.prompt ("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    // Use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            // Do nothing, function ends
            break;
        default:
            window.alert("You did not pick a valid option, Try again.");
            // Call shop() again to force user valid response
            shop();
            break;
        }
};

// Function to generate random number
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");
        this.health += 20;
        this.money -= 7;
    } 
    else {
        window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -=7;
    }
    else {
        window.alert("You don't have enough money money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// execute function
startGame();