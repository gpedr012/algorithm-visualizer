import React from "react";
import classes from "./Backdrop.module.css";

const Backdrop = (props) => {

    return (
        props.navIsOpen ? <div className={classes.backdrop} onClick={props.handleBackdropClicked}/> : null
    );
}

export default Backdrop;