import React from "react";
import "../styles/Tile.css";
function Tile({srcNum} : {srcNum: string}) {
    let srcStr = "/assets/images/" + srcNum + ".jpg";
    return(
        <div className="Tile">
            <div className="TileImg">
                <img src={srcStr} alt="" />
            </div>
            <div className="TileCover">
            </div>
        </div>
    );
}
export default Tile;