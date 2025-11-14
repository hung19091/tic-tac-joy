# Tic-Tac-Joy

A beautifully designed, playful Tic-Tac-Toe game with a cheerful, kid-friendly interface and delightful animations.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/hung19091/tic-tac-joy)

## ✨ Key Features

-   **Interactive 3x3 Grid**: A clean and responsive game board.
-   **Playful Animations**: Smooth, bouncy animations for placing marks and celebrating wins, powered by Framer Motion.
-   **Clear State Management**: A robust state machine built with Zustand handles player turns, win conditions, and draws.
-   **Kid-Friendly UI**: A bright, colorful, and approachable design using large, rounded elements.
-   **Win/Draw Detection**: Automatically detects wins across all rows, columns, and diagonals, as well as draw conditions.
-   **Instant Reset**: A "New Game" button to immediately start a new match.

## 🛠️ Technology Stack

-   **Framework**: React (with Vite)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: shadcn/ui
-   **State Management**: Zustand
-   **Animation**: Framer Motion
-   **Icons**: Lucide React
-   **Deployment**: Cloudflare Pages & Workers

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:
-   [Node.js](https://nodejs.org/en/) (v18 or later)
-   [Bun](https://bun.sh/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/tic-tac-joy.git
    cd tic-tac-joy
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Run the development server:**
    ```bash
    bun dev
    ```
    The application will be available at `http://localhost:3000`.

## 💻 Development

The core application logic is contained within the `src` directory.

-   `src/pages/HomePage.tsx`: This is the main component that renders the game view, including the board, status display, and controls.
-   `src/stores/gameStore.ts`: The Zustand store that manages the entire game state, including the board, current player, and game status.
-   `src/components/ui/`: Contains the reusable shadcn/ui components used throughout the application.

## ☁️ Deployment

This project is optimized for deployment on the Cloudflare global network.

### One-Click Deploy

You can deploy this application to your own Cloudflare account with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/hung19091/tic-tac-joy)

### Manual Deployment

If you have cloned the repository and have the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/) installed, you can deploy manually.

1.  **Login to Cloudflare:**
    ```bash
    bunx wrangler login
    ```

2.  **Build the project:**
    ```bash
    bun run build
    ```

3.  **Deploy to Cloudflare Pages:**
    ```bash
    bun run deploy
    ```

Wrangler will build and deploy your application, providing you with a live URL to view and share your game.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.