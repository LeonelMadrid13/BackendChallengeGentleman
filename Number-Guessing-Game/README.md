# 🎲 Number Guessing Game (CLI)

Test your luck and logic! Guess the secret number the computer is thinking of—can you do it before your chances run out?

---

## 🚀 Overview

A classic number guessing game played from the command line. The computer randomly selects a number between 1 and 100, and you must guess it within a limited number of tries (based on difficulty level). Get feedback on each guess, and try to set your best high score!

---

## ✨ Features

* Randomly selects a secret number between 1 and 100 each game
* Three difficulty levels:

  * Easy (10 guesses)
  * Medium (5 guesses)
  * Hard (3 guesses)
* Hints after every guess (“higher” or “lower”)
* Displays number of attempts used
* Clean CLI interaction—no external dependencies
* Optional: replay, timer, hints, and high score tracking

---

## 🛠️ Requirements

* Node.js (recommended) or any language that supports CLI input
* Terminal/command prompt

---

## 🚦 How to Play

1. **Run the game:**

   ```bash
   node number-guessing-game.js
   ```
2. **Follow the prompts:**

   * Choose a difficulty level (easy/medium/hard)
   * Guess the number (1–100) within the allowed attempts
   * See hints after each guess
   * Win if you guess the number, or lose if you run out of attempts

**Sample output:**

```
Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
You have 5 chances to guess the correct number.

Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)

Enter your choice: 2
Great! You have selected the Medium difficulty level.
Let's start the game!

Enter your guess: 50
Incorrect! The number is less than 50.

Enter your guess: 25
Incorrect! The number is greater than 25.

Enter your guess: 30
Congratulations! You guessed the correct number in 3 attempts.
```

---

## 🧑‍💻 Advanced Challenges

* Allow replay: after a round, ask if the user wants to play again
* Add a timer and show the time taken to guess the number
* Implement a hint system for when the user is stuck
* Keep track of the best high score per difficulty

---

## 🌠 Credits

Inspired by the [roadmap.sh Number Guessing Game Challenge](https://roadmap.sh/projects/number-guessing-game).

> *“Imagination will often carry us to worlds that never were. But without it we go nowhere.”*
> — Carl Sagan

---

## 🙋‍♂️ Happy guessing!
