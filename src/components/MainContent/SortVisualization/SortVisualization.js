import React from "react";
import classes from "./SortVisualization.module.css"
import Bar from "./Bar/Bar";

/*
* Needs to receive array of objects for each bar to populate it.
* Maybe another component will be the one in charge of moving stuff around as
* the algorithm sorts
 */
const SortVisualization = () => {
    return (
        <div className={classes.visualization}>
            <Bar barName={"5"} height={"5"}/>
            <Bar barName={"11"} height={"11"}/>
            <Bar barName={"20"} height={"20"}/>
            <Bar barName={"25"} height={"25"}/>
            <Bar barName={"10"} height={"10"}/>
            <Bar barName={"1"} height={"1"}/>
            <Bar barName={"100"} height={"100"}/>
        </div>

    )
}

export default SortVisualization;