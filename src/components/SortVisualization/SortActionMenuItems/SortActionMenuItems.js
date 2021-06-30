import React from "react";
import classes from "./SortActionMenuItems.module.css";

const SortActionMenuItems = (props) => {

    return (
        <div className={classes.content}>
            {props.algorithm.name}
            <button className={classes['sort-btn']} onClick={props.sort}>Sort</button>
            <button>Create Array</button>
            <div>
                <span>Speed</span>
            <input className={classes.slider} type={"range"} min={"50"} max={"3000"}/>
            </div>
        </div>
    )
}

export default SortActionMenuItems;