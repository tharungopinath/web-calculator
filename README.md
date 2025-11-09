# Web Calculator

A small browser-based calculator built with plain HTML, CSS and JavaScript. This project implements a basic calculator UI (digits, decimal, arithmetic operators, clear, backspace and equals) and includes handling for many edge cases you would expect from a real calculator: single-line right‑pinned display, backspace behavior, decimal handling, intermediate evaluation, safe equals handling, and automatic scientific-notation formatting for very large/small results.

This README documents what the app does, how to use it, the implementation details, edge cases covered, testing tips, and possible next steps.

---

## Live / Local preview

- Open `index.html` in your browser (double-click the file). The app needs no build step.
- Recommended: serve the folder with a local static server (optional):

	```powershell
	# from the project folder (PowerShell)
	python -m http.server 8000
	# then open http://localhost:8000/web-calculator/
	```

---

## Features implemented

- Clickable buttons for digits 0–9 and decimal point
- Arithmetic operations: add (+), subtract (-), multiply (*), divide (/)
- Clear (reset), Backspace (delete last character or operator), Equals (=)
- Right-aligned single-line display that clips long numbers on the left (shows newest digits)
- Character-aware clipping so partially-cut digits are never shown (keeps whole glyphs)
- Decimal handling per operand (prevents multiple decimals in the same number)
- Intermediate evaluation when chaining operations (e.g. `5 + 6 * 3` evaluates left-to-right in current UX)
- Safe equals handling (prevents evaluating with a missing right-hand operand)
- Automatic numeric formatting: limits decimals, converts very large or very small results to scientific notation for readability
- Backspace behavior that removes digits, re-enables decimal as appropriate, and removes operator when second operand is empty

---

## Usage

1. Open `index.html` in the browser.
2. Click numeric buttons to enter the first operand (or use a future keyboard binding if added).
3. Click an operator to begin the second operand.
4. Click digits for the second operand and then `=` to evaluate. Operators pressed while entering the second operand will evaluate the pending operation and prepare for the next one.
5. Use `Clear` to reset the calculator and `⌫` (Backspace) to remove the last entered character/operator.

Notes:
- Decimal button is disabled while the current operand already contains a decimal point. Backspace re-enables it when the decimal is removed.
- When large results occur (>= 1e12 or < 1e-9), the display will switch to exponential notation to keep the output readable.

---

## Implementation details (important bits)

- `script.js` contains the calculator logic. Key variables:
	- `str1`, `str2` — the string forms of the left and right operands (what the user types)
	- `num1`, `num2` — numeric values derived from the strings via `toNum()`
	- `userOp` — array used to store pending operator(s)

- `toNum(str)` converts input strings to numbers with sensible rounding: it keeps at most 7 decimal places for display/computation consistency.

- `formatNumber(val)` converts numeric results into display-ready strings. It forces scientific notation for very large/small magnitudes and trims unnecessary decimals otherwise.

- The UI uses button disabling to prevent invalid sequences (operators disabled until a left operand exists, `=` disabled until right operand present, decimal disabled if operand already contains a decimal, etc.).

- Event handling is done by attaching listeners to buttons and updating the canonical state variables. The display is updated from those variables after each action.

---

## Project structure

```
web-calculator/
├── index.html        # frontend UI (buttons + display)
├── styles.css        # styling for layout, buttons, display
├── script.js         # application logic (event handlers, computation, formatting)
└── README.md         # this file
```

## ⚖️ License

This project is licensed under the **MIT License**.

**Copyright (c) 2025 tharun**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.