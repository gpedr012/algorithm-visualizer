import React from "react";
import classes from "./Bar.module.css"

const Bar = (props) => {
    return (
        <div className={classes.bar} style={{height: props.height*3+"px"}}>
            {props.barName}
        </div>
    )
}

export default Bar;