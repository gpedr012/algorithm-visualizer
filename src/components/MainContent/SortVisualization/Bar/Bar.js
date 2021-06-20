import React from "react";
import classes from "./Bar.module.css"

const Bar = (props) => {
    const heightModifier = 5;
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