
import React, { useEffect, useState } from 'react';

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

  const [matchedTiles, setMatchedTiles] = useState<number[]>([]);

  
  
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
    
    setMatchedTiles([]);
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
    
    (document.querySelector('.resetBtn') as HTMLButtonElement)!.style.display = 'none';
    (document.querySelector('.Scorecard') as HTMLDivElement)!.style.display = 'none';
   
  };
  
  const startGame = () => {
    // Start the game
    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked') as HTMLInputElement;
    if (selectedDifficulty && selectedDifficulty.value) {
      setTime(0);
      setMoves(0);
      
      // update Time
      setIsRunning(true);
      document.querySelector('button')!.disabled = true; //disable the start button
      
      document.querySelectorAll<HTMLInputElement>('input[name="difficulty"]').forEach((q) => {
        q.disabled = true; //disable the radio buttons
      });
      (document.querySelector('.difficultyParent') as HTMLDivElement)!.style.display = 'none';
      (document.querySelector('.resetBtn') as HTMLButtonElement)!.style.display = 'inline-block';
      (document.querySelector('.Scorecard') as HTMLDivElement)!.style.display = 'inline-block';
   
      // based on the selected difficulty, set the number of tiles
      setDiff(selectedDifficulty.value);
      switch (selectedDifficulty.value) {
        case "easy":
          // generate positions for 8 tiles
          setSequence(generateSequence(8));
          set_n(8);
          setScore(800);
          break;

        case "medium":
          setSequence(generateSequence(16));
          set_n(16);
          setScore(1600);
          break;

        case "hard":
          setSequence(generateSequence(20));
          set_n(20);
          setScore(2000);
          break;

        default:
          setSequence(generateSequence(0));
          set_n(null);
          break;
      }
    }
  };

  //useEffect to update score based on moves, time, and 
  useEffect(() => {
    if(time!==undefined && time>0 && n!==null){
      setScore(n*100 - (moves*10) - (time*5) + (matchedTiles.length*10));
    }
  }, [moves, time, matchedTiles]);
  

  

  return (
    <div className="App">
      <h1>Meme-ory Game</h1>
      
      <p>
        Test your memory, with memes! Match tiles of same meme to complete the game.
      </p>
      <main>
        
        <div className="difficultyParent">
          <div className="dif">
            <input type="radio" name="difficulty" id="easy" value="easy" />
            <label htmlFor="easy">
              Easy
            </label>
            <input type="radio" name="difficulty" id="medium" value="medium" />
            <label htmlFor="medium">
              Medium
            </label>
            <input type="radio" name="difficulty" id="hard" value="hard" />
            <label htmlFor="hard">
              Hard
            </label>
          </div>
          <button className="startBtn" onClick={startGame}>START</button>
        </div>
        
        
        {n !== null && <Board 
                        n={n} 
                        sequence={sequence} 
                        setIsRunning={setIsRunning} 
                        moves={moves} 
                        setMoves={setMoves}
                        matchedTiles={matchedTiles}
                        setMatchedTiles={setMatchedTiles}
                        />
        }
        <br />
        <button className="resetBtn" onClick={resetGame}>RESET</button>
        <br />
        <Scorecard t={time} s={score} m={moves} diff={diff}/>
      </main>
      <footer>
        Made by Vishal Dhatrika. <a href="https://vishaldhatrika.me">Visit my website</a>
      </footer>
    </div>
  );
}

export default App;