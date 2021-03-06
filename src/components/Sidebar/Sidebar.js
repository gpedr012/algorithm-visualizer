import React, {useState} from "react";
import classes from "./Sidebar.module.css";
import {algorithms} from "../../util/utils";
import Backdrop from "./Backdrop/Backdrop";

const Sidebar = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleSidebarBtn = () => {
        setIsOpen(oldV => !oldV);

    }

    const handleNavSelection = (algo) => {
        setTimeout(() => handleSidebarBtn(), 250);
        props.handleAlgoSelection(algo);

    }

    let buttonClass = isOpen ? `${classes['button-icon']} ${classes['button-icon__close']}` : classes['button-icon'];
    let sideBarClass = isOpen ? `${classes.sidebar} ${classes['sidebar__open']}` : classes.sidebar;

    const handleBackdropClicked = () => {
        setIsOpen(false);
    }

    return (
        <React.Fragment>
            <Backdrop navIsOpen={isOpen} handleBackdropClicked={handleBackdropClicked}/>
            <div onClick={handleSidebarBtn} className={classes.button}>
                <div className={buttonClass}>
                    >
                </div>
            </div>
            <div className={sideBarClass}>
                <nav>
                    <ul>
                        <h3>Sorting Algorithms</h3>

                        {Object.keys(algorithms).map(
                            value => <li key={algorithms[value].code} className={props.activeAlgorithm.code === algorithms[value].code ? classes.active : ''}
                                         onClick={handleNavSelection.bind(null, algorithms[value])}>{algorithms[value].name} Sort</li>
                        )}
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    );
}

export default Sidebar;