import React from "react";
import classes from "./Bar.module.css"
import {COMPARE, IDLE, SWAP_END, SWAP_INIT} from "../../../util/sortingStates";

const Bar = (props) => {
    const heightModifier = 5;

    const getBarClass = (barState) => {
        switch (barState) {
            case IDLE:
                return classes['bar-idle'];

            case COMPARE:
                return classes['bar-compare'];

            case SWAP_INIT:
            case SWAP_END:
                return classes['bar-swap'];

            default:
                return classes['bar-idle'];

        }
    }

    return (

        <div className={classes.content}>
            <div className={getBarClass(props.barState)} style={{height: props.height * heightModifier + "px"}}>
                &nbsp;
            </div>
            <div className={classes.number}>
                {props.barName}
            </div>
        </div>
    )
}

export default Bar;