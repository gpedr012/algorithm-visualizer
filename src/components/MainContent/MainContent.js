import React from "react";
import classes from "./MainContent.module.css"
import SortVisualization from "../SortVisualization/SortVisualization";

const MainContent = (props) => {

    return (
        <div className={classes['main-content']}>
            <SortVisualization algorithm={props.algorithm}/>
        </div>
    )
}

export default MainContent;