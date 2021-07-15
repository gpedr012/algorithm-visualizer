import React from "react";
import classes from "./Bar.module.css"

const Bar = (props) => {
    const heightModifier = 5;

    const getBarClass = (barState) => {
        return classes[`bar__${barState.toLowerCase()}`];

    }

    console.log(props.slimMode);

    let numberContainer = (
        <div className={classes.number}>
            {props.height}
        </div>
    );

    return (
        <div className={` ${classes.content} ${props.slimMode ? classes['slim-mode__' + props.slimMode] : ''} `}>
            <div className={getBarClass(props.barState)} style={{height: props.height * heightModifier + "px"}}>
                &nbsp;
            </div>
            {props.slimMode ? '' : numberContainer}
        </div>
    )
}

export default Bar;