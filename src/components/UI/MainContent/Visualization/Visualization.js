import React from "react";
import classes from "./Visualization.module.css"
import Bar from "./Bar/Bar";

const Visualization = () => {
    return (
        <div className={classes.visualization}>
            <Bar barName={"B 1"} height={"5"}/>
            <Bar barName={"Bar 2"} height={"11"}/>
            <Bar barName={"Bar 3"} height={"20"}/>

        </div>

    )
}

export default Visualization;