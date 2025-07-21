# 🔄 Unit Converter Web App

A simple, multi-page web app for converting units of length, weight, and temperature. Enter a value, choose your units, and let the backend do the math!

---

## 🚀 Overview

This project helps you convert between different units of measurement—like meters to miles, kilograms to pounds, or Celsius to Fahrenheit—using classic web forms and a backend server. It’s built to help you learn how web forms, HTTP requests, and backend logic work together.

---

## ✨ Features

* Convert between units of **length** (mm, cm, m, km, inch, foot, yard, mile)
* Convert between units of **weight** (mg, g, kg, oz, lb)
* Convert between units of **temperature** (Celsius, Fahrenheit, Kelvin)
* User-friendly HTML forms for each unit type
* Server-side logic for accurate and secure conversions
* No database required

---

## 📄 Usage

* Open `/length`, `/weight`, or `/temperature` in your browser
* Enter a value and select the units to convert from and to
* Submit the form and view the result
* Change values and try again as needed

---

## 🛠️ Requirements

* Node.js (or Python, PHP, etc.—any backend language with HTTP support)
* Basic knowledge of HTML and your chosen server language

---

## 🚦 Getting Started (Node.js Example)

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/unit-converter.git
   cd unit-converter
   ```
2. **Install dependencies (if needed)**

   ```bash
   npm install express body-parser
   ```
3. **Run the server**

   ```bash
   node server.js
   ```
4. **Open in your browser:**

   * [http://localhost:3000/length](http://localhost:3000/length)
   * [http://localhost:3000/weight](http://localhost:3000/weight)
   * [http://localhost:3000/temperature](http://localhost:3000/temperature)

---

## 🗂️ Project Structure

```
/
├── server.js          # Backend logic (Node.js example)
├── public/
│   ├── length.html
│   ├── weight.html
│   └── temperature.html
└── README.md
```

---

## 🧠 How it Works

* Each HTML form submits to the server (POST request)
* The server reads the value and unit choices, calculates the result, and returns a new HTML page with the answer
* No JavaScript required on the client—everything is handled server-side
![Wireframe](https://assets.roadmap.sh/guest/unit-converter-be-project.png "Wireframe")

---

## 🔬 Example Conversion Formulas

* **Length:** All units converted via meters as the base
* **Weight:** All units converted via grams or kilograms as the base
* **Temperature:**

  * Celsius to Fahrenheit: `(C * 9/5) + 32`
  * Fahrenheit to Celsius: `(F - 32) * 5/9`
  * Celsius to Kelvin: `C + 273.15`
  * Kelvin to Celsius: `K - 273.15`
  * ...and so on

---

## 🌠 Credits

Inspired by the [roadmap.sh Unit Converter Challenge](https://roadmap.sh/projects/unit-converter).

> *“Somewhere, something incredible is waiting to be known.”*
> — Carl Sagan

---

## 🙋‍♂️ Happy converting!
