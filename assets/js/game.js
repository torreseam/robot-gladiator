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



// this creates a function names "fight"
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// create function
var fight = function (enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {
        // Fight or Skip prompt
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'Fight' or 'Skip' to choose.");

        // If user picks "skip" confirm and stop loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // If yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // Subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney)
                break;
            }
        }

        // Remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " had died!");

            // Award player money for winning
            playerMoney = playerMoney + 20;

            // Leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " healthy left.");
        }

        // Subtract the value of 'enemyAttack' from the value of 'playerhealth and use that result to update the value in the 'playerHealth' variable.
        playerHealth = playerHealth - enemyAttack;
        // Log a resulting message to the console so we know that it worked. 
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

        // Check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            // Leave while() loop if player is dead
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};
var startGame = function () {
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // let user know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            // reset enemyHealth before starting new fight
            enemyHealth = 50;

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
        // play again
        endGame();
    }
};

var endGame = function () {
    // If player is still alive
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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

// execute function
startGame();