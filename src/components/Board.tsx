import React from "react";
import "../styles/Board.css";
import Tile from "./Tile";
interface BoardProps {
    n: number;
}

function Board({n}: BoardProps) {
    let h: number; 
    let w: number;
    n%2!==0 ? n = n - 1 : n=n;
    h = Math.floor(Math.sqrt(n));
    w = n / h;
    let i=0;
    return(
        <div className="Board">
                {
                    Array.from({length: h}, (_, i) => i).map((i) => (
                        <div className="Row" key={i}>
                            {
                                Array.from({length: w}, (_, j) => j).map((j) => (
                                    <Tile srcNum={String(0)} key={i*w + j} />
                                ))
                            }
                        </div>
                    ))
                
                }
                
        </div>
    );

}
export default Board;