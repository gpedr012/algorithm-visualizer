import React from "react";
import classes from "./Bar.module.css"

const Bar = (props) => {
    const heightModifier = 5;

    const getBarClass = (barState) => {
        return classes[`bar__${barState.toLowerCase()}`];

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