
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Scorecard from './components/Scorecard'; // Import the Scorecard component
import Board from './components/Board'; // Import the Board component

function App() {
  // Define the state for the number of tiles
  const [n, set_n] = useState<number | null>(null);
  
  const startGame = () => {
    // Start the game
    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked') as HTMLInputElement;
    if (selectedDifficulty && selectedDifficulty.value) {
      document.querySelector('button')!.disabled = true; //disable the start button
      
      document.querySelectorAll<HTMLInputElement>('input[name="difficulty"]').forEach((q) => {
        q.disabled = true; //disable the radio buttons
      });
      (document.querySelector('.difficultyParent') as HTMLDivElement)!.style.display = 'none';

      // based on the selected difficulty, set the number of tiles
      switch (selectedDifficulty.value) {
        case "easy":
          set_n(8);
          break;
        case "medium":
          set_n(16);
          break;
        case "hard":
          set_n(20);
          break;
        default:
          set_n(null);
          break;
      }
    }
  }

  return (
    <div className="App">
      <h1>Meme-ory Game</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Test your memory, with memes! Match tiles of same meme to complete the game.
      </p>
      <main>
        <Scorecard />
        <div className="difficultyParent">
          <label htmlFor="easy">
            <input type="radio" name="difficulty" id="easy" value="easy" />Easy
          </label>
          &nbsp;&nbsp;&nbsp;
          <label htmlFor="medium">
            <input type="radio" name="difficulty" id="medium" value="medium" />Medium
          </label>
          &nbsp;&nbsp;&nbsp;
          <label htmlFor="hard">
            <input type="radio" name="difficulty" id="hard" value="hard" />Hard
          </label>
          &nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;
          <button onClick={startGame}>Start Game</button>
        </div>
        
        
        {n !== null && <Board n={n} />}
        <br />
        <button>Reset</button>
      </main>
    </div>
  );
}

export default App;

