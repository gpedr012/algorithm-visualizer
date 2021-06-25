import React from "react";
import classes from "./Sidebar.module.css";

const Sidebar = () => {
    return (
        <div className={classes.sidebar}>
            <nav>
                <ul>
                    <h3>Sorting Algorithms</h3>
                    <li>Bubble Sort</li>
                    <li>Selection Sort</li>
                    <li>Insertion Sort</li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;