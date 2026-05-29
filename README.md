# Ancient Rome Quiz

A responsive React quiz about Ancient Rome. Answer five multiple-choice questions under a timer, use hints when time runs low, and see your score at the end.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended, v18 or newer)
- npm (comes with Node.js)

## How to run the site

1. **Open a terminal** in the project folder (`tehila-Dazn`).

2. **Install dependencies** (first time only):

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open the app** in your browser using the URL shown in the terminal (usually `http://localhost:5173`).

### Other commands

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm run build`   | Builds the app for production into the `dist` folder |
| `npm run preview` | Serves the production build locally (run `build` first) |
| `npm run lint`    | Runs ESLint on the project                        |

## How to use the site

1. **Home page** — You land on the welcome screen with the title *Ancient Rome Quiz*. Tap or click **Start Quiz** to begin.

2. **Quiz** — You get **5 random questions** from the question bank. For each question:
   - Read the question and pick one of the answer choices.
   - A **20-second timer** counts down at the top of the card.
   - When **10 seconds or fewer** remain, a **hint** appears (if you have not answered yet).
   - After you select an answer—or when time runs out—the **correct answer** is highlighted for about **1 second**, then the next question loads automatically.

3. **Results** — After all five questions, you see your **score**, **accuracy**, and feedback based on how well you did. Use **Try Again** to return to the home page and start a new quiz (with a new random set of questions).

4. **Mobile** — The layout is responsive; you can use the quiz on a phone or desktop. Use a narrow browser window (~320–480px) to check the mobile experience.

## Tech stack

- React 19 + Vite
- React Router
- SCSS (Imperial Purple theme)
- Question data: `src/data/MockData.json` (no backend required for local use)
