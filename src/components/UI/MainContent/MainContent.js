import React from "react";
import classes from "./MainContent.module.css"
import Visualization from "./Visualization/Visualization";

const MainContent = () => {
    return (
        <div className={classes['main-content']}>
            <Visualization/>
        </div>
    )
}

export default MainContent;