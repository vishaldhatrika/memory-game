
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Scorecard from './components/Scorecard'; // Import the Scorecard component
import Board from './components/Board'; // Import the Board component

function App() {
  
  const [n, set_n] = useState<number | null>(null);
  const [time, setTime] = useState<number | undefined>();
  const [isRunning, setIsRunning] = useState(false);
  const[score, setScore] = useState(0);
  const[moves, setMoves] = useState(0);
  const [diff, setDiff] = useState<string | undefined>(); // difficulty
  
  
  const [sequence, setSequence] = useState<number[]>([]);

  // Function to generate a random sequence
  const generateSequence = (n: number) => {
    const seq = [];
    for (let i = 0; i < n / 2; i++) {
      seq.push(i);
      seq.push(i);
    }
    return seq.sort(() => Math.random() - 0.5);
  };



  useEffect(() => {
    let timer: NodeJS.Timeout;
  
    if (isRunning && time !== undefined) {
      // Start a timer that updates the time every second
      timer = setInterval(() => {
        setTime((prevT) => (prevT !== undefined ? prevT + 1 : 0));
      }, 1000);
    }
  
    // Clean up the timer when the component is unmounted or when isRunning/t changes
    return () => {
      clearInterval(timer);
    };
  }, [isRunning, time]);



  const resetGame = () => {
    set_n(null);
    setMoves(0);
    setScore(0);
    setTime(undefined);
    setIsRunning(false);
    setSequence(generateSequence(0));
    setDiff(undefined);
    // Reset the game
    document.querySelector('button')!.disabled = false; //enable the start button
    document.querySelectorAll<HTMLInputElement>('input[name="difficulty"]').forEach((q) => {
      q.disabled = false; //enable the radio buttons
    });
    (document.querySelector('.difficultyParent') as HTMLDivElement)!.style.display = 'block';
   
  };
  
  const startGame = () => {
    // Start the game
    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked') as HTMLInputElement;
    if (selectedDifficulty && selectedDifficulty.value) {
      setTime(0);
      // update Time
      setIsRunning(true);
      document.querySelector('button')!.disabled = true; //disable the start button
      
      document.querySelectorAll<HTMLInputElement>('input[name="difficulty"]').forEach((q) => {
        q.disabled = true; //disable the radio buttons
      });
      (document.querySelector('.difficultyParent') as HTMLDivElement)!.style.display = 'none';

      // based on the selected difficulty, set the number of tiles
      setDiff(selectedDifficulty.value);
      switch (selectedDifficulty.value) {
        case "easy":
          // generate positions for 8 tiles
          setSequence(generateSequence(8));
          set_n(8);
          break;

        case "medium":
          setSequence(generateSequence(16));
          set_n(16);
          break;

        case "hard":
          setSequence(generateSequence(20));
          set_n(20);
          break;

        default:
          setSequence(generateSequence(0));
          set_n(null);
          break;
      }
    }
  };

  

  

  return (
    <div className="App">
      <h1>Meme-ory Game</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Test your memory, with memes! Match tiles of same meme to complete the game.
      </p>
      <main>
        <Scorecard t={time} s={score} m={moves} diff={diff}/>
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
        
        
        {n !== null && <Board n={n} sequence={sequence}/>}
        <br />
        <button onClick={resetGame}>Reset</button>
      </main>
    </div>
  );
}

export default App;