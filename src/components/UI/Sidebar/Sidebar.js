import React from "react";
import classes from "./Sidebar.module.css";

const Sidebar = () => {
    return (
        <div className={classes.sidebar}>
            <nav>
                <ul>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;