import React from "react";
import "../styles/Scorecard.css";
function Scorecard({t, s, m, diff}: {t: number | undefined, s: number, m: number, diff: string | undefined}) {
    return(
        <div className="Scorecard">
            {
                (diff!==undefined) && <div className="diff">{"Playing Level : "+diff}</div> 
            }
            <br />
            <span className="s">Score : {(t!==undefined) && s}   </span>
            <span className="m">Moves : {(t!==undefined) && m}   </span>
            <span className="t">Time : {(t!==undefined) && t}   </span> 
        </div>
    );
}
export default Scorecard;