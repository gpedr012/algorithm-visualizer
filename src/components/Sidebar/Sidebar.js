import React, {useState} from "react";
import classes from "./Sidebar.module.css";

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleSidebarBtn = () => {
        setIsOpen(oldV => !oldV);

    }

    let buttonClass = isOpen ?  `${classes['button-icon']} ${classes['button-icon__close']}` : classes['button-icon'];
    let sideBarClass = isOpen ? `${classes.sidebar} ${classes['sidebar__open']}` : classes.sidebar;

    return (
        <React.Fragment>
            <div onClick={handleSidebarBtn} className={classes.button}>
                <div className={buttonClass}>
                    >
                </div>
            </div>
            <div className={sideBarClass}>
                <nav>
                    <ul>
                        <h3>Sorting Algorithms</h3>
                        <li>Bubble Sort</li>
                        <li>Selection Sort</li>
                        <li>Insertion Sort</li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    );
}

export default Sidebar;