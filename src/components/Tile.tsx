import React, { MouseEventHandler } from "react";
import "../styles/Tile.css";    
function Tile({srcNum, isOpen, isFinalOpen, checkClick} : {srcNum: string, checkClick: MouseEventHandler, isOpen: boolean, isFinalOpen: boolean}) {
    let srcStr = "/assets/images/" + srcNum + ".jpg";
    return(
        <div className={`Tile ${isOpen ? "open" : ""} ${isFinalOpen ? "finalOpen" : ""} `} onClick={checkClick}>
            <div className="TileImg">
                <img src={srcStr} alt="" />
            </div>
            <div className="TileCover">
            </div>
        </div>
    );
}
export default Tile;