import classes from "./ActionMenu.module.css"
import React from "react";

const ActionMenu = (props) => {

    return (
        <div className={classes['action-menu']}>
            {props.children}
        </div>
    );


}

export default ActionMenu;