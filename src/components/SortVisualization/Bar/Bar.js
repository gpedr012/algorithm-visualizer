import React from "react";
import classes from "./Bar.module.css"
import {IDLE} from "../../../util/sortingStates";

const Bar = (props) => {
    const heightModifier = 5;

    // const getBarClass = (barState) => {
    //     switch (barState) {
    //         case IDLE:
    //             return classes.
    //     }
    // }

    return (

        <div className={classes.content}>
            <div className={classes.bar} style={{height: props.height * heightModifier + "px"}}>
                &nbsp;
            </div>
            <div className={classes.number}>
                {props.barName}
            </div>
        </div>
    )
}

export default Bar;