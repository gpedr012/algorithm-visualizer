import React from "react";
import classes from "./MainContent.module.css"
import SortVisualization from "../SortVisualization/SortVisualization";
import ActionMenu from "../ActionMenu/ActionMenu";

const MainContent = () => {
    return (
        <div className={classes['main-content']}>
            <SortVisualization/>
            <ActionMenu>

            </ActionMenu>
        </div>
    )
}

export default MainContent;