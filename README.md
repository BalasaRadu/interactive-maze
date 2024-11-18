# Interactive Maze Game

This project implements an interactive maze game where the player navigates through levels using the keyboard. The maze is dynamically generated using an iterative randomized Prim's algorithm to create paths and walls. The game features multiple levels, and the complexity of the maze increases with each level.

## Maze generation

The maze is generated using an iterative randomized Prim's algorithm. The process begins by initializing a grid where each cell is either a wall or a path. The algorithm starts at a predefined position (the player's starting point) and adds neighboring cells to a priority queue based on random values (which influence the order of cell expansion). As the algorithm proceeds, it explores adjacent cells, marking them as paths if they have only one neighboring path already created. This ensures that the maze remains solvable by preventing disconnected sections. The priority queue helps to efficiently select the next cell to explore, and the randomization creates the maze's unique structure each time the game is played. Once the maze is created, a finish point is placed in the lower-right corner. Additionally, the complexity of the maze is adjusted by increasing the density of walls with each level, making the maze progressively harder as the player advances through the game. 

## How to Play

1. Start the game by running the script.
2. Use `w`, `a`, `s`, `d` keys to move the player through the maze.
3. Reach the finish (`^`) to complete the level.
4. Press Enter to move to the next level.
5. Press `q` to quit the game at any time.

## Game Mechanics

- The maze is displayed in a grid where:
  - `░` represents a path.
  - `O` represents a hole (impassable area).
  - `@` marks the player's position.
  - `^` marks the finish point.
- The maze's complexity increases with each level.
- If the player steps outside the valid path, the game ends with a loss.
- If the player reaches the finish point, they progress to the next level.

## Files

- **main.js**: Handles game logic, player input, and level progression.
- **field.js**: Implements the maze generation and player movement within the field. It uses a priority queue to perform randomized Prim's algorithm for maze creation.

## Installation

1. Clone the repository.
2. Install dependencies by running:  
   ```bash
   npm install keypress js-priority-queue
     ```
    Run the game:

    ```
    node main.js
    ```
