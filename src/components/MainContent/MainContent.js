import React from "react";
import classes from "./MainContent.module.css"
import SortVisualization from "./SortVisualization/SortVisualization";

const MainContent = () => {
    return (
        <div className={classes['main-content']}>
            <SortVisualization/>
        </div>
    )
}

export default MainContent;