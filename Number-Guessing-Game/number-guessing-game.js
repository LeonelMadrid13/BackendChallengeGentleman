const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper to use readline.question as a promise
function ask(questionText) {
  return new Promise(resolve => {
    readline.question(questionText, answer => {
      resolve(answer);
    });
  });
}

async function main() {
    console.log(`
    Welcome to the Number Guessing Game!
    I'm thinking of a number between 1 and 100.
    `)
  const DIFFICULTY_LEVELS = {
    EASY: 10,
    MEDIUM: 5,
    HARD: 3
  };
  let maxAttempts;
  let chosenDifficulty;
  while (!maxAttempts) {
    chosenDifficulty = await ask(`
    Welcome to the Number Guessing Game! 
    Choose a difficulty level: 
    1 - EASY  (10 attempts)
    2 - MEDIUM (5 attempts)
    3 - HARD   (3 attempts)
    Enter your choice: `);
    
      switch (chosenDifficulty.trim()) {
        case '1':
          console.log("Great! You have selected the Easy difficulty level.");
          maxAttempts = DIFFICULTY_LEVELS.EASY;
          break;
        case '2':
          console.log("Great! You have selected the Medium difficulty level.");
          maxAttempts = DIFFICULTY_LEVELS.MEDIUM;
          break;
        case '3':
          console.log("Great! You have selected the Hard difficulty level.");
          maxAttempts = DIFFICULTY_LEVELS.HARD;
          break;
        default:
          console.log("Invalid choice. Please select 1, 2, or 3.");
          break;
      }
  }

  const secretNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

    let guessedCorrectly = false;
    console.log(`You have ${maxAttempts} chances to guess the correct number.`);
    console.log('Let\'s start the game!');
    while (attempts < maxAttempts && !guessedCorrectly) {
        const guess = await ask(`\nEnter your guess: `);
        const guessNumber = parseInt(guess);
        if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
        console.log("Please enter a valid number between 1 and 100.");
        continue;
        }
        attempts++;
        if (guessNumber === secretNumber) {
        console.log(`Congratulations! You guessed the correct number in ${attempts} attempts.`);
        guessedCorrectly = true;
        } else if (guessNumber > secretNumber) {
        console.log(`Incorrect! The number is less than ${guessNumber}.`);
        } else {
        console.log(`Incorrect! The number is greater than ${guessNumber}.`);
        }
    }
    if (!guessedCorrectly) {
        console.log(`Sorry, you've used all your attempts. The secret number was ${secretNumber}. Better luck next time!`);
    }
  readline.close();
}

main();
