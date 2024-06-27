import React, { useState } from "react";
import "../styles/Board.css";
import Tile from "./Tile";
interface BoardProps {
    n: number;
    sequence: number[];
}

function Board({n, sequence}: BoardProps) {
    let h: number; 
    let w: number;
    (n%2!==0) && (n = n - 1);
    h = Math.floor(Math.sqrt(n));
    w = n / h;
    
    const [openTile, setOpenTile] = useState<number>(-1);
    const [matchedTiles, setMatchedTiles] = useState<number[]>([]);

    const checkClick = (idx: number) => {
        if (openTile === -1) {
            setOpenTile(idx);
        } 
        else if(idx===openTile){
            setOpenTile(idx);
        } 
        else {
            if (sequence[idx] === sequence[openTile]) {
                setMatchedTiles([...matchedTiles, openTile, idx]);
                setOpenTile(-1);
            } else {
                setOpenTile(idx);
            }
        }
    };

    return(
        <div className="Board">
            {
                Array.from({ length: h }, (_, i) => (
                    <div className="Row" key={i}>
                        {
                            Array.from({ length: w }, (_, j) => {
                                const idx = i * w + j;
                                const isOpen = openTile === idx || matchedTiles.includes(idx);
                                const isFinalOpen = matchedTiles.includes(idx);
                                return (
                                    <Tile
                                        srcNum={String(sequence[idx])}
                                        key={idx}
                                        isOpen={isOpen}
                                        isFinalOpen={isFinalOpen}
                                        checkClick={() => checkClick(idx)}
                                    />
                                );
                            })
                        }
                    </div>
                ))
            }
        </div>
    );

}
export default Board;