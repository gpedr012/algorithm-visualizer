import React, {useState} from "react";
import classes from "./SortActionMenuItems.module.css";

const SortActionMenuItems = (props) => {

    const [showingMain, setShowingMain] = useState(true);


    const handleReturnBtn = () => {
        setShowingMain(true);
    }

    const handleCreateArrayBtn = () => {
        setShowingMain(false);
    }

    const handleNewRandomArrayBtn = (evt) => {
        evt.preventDefault();


    }

    const handleSliderChange = (evt) => {
        console.log(evt.target.value);

    }

    let mainContent = (<div className={classes.content}>
        {props.algorithm.name}
        <button className={classes.btn} onClick={props.sort}>Sort</button>
        <button onClick={handleCreateArrayBtn} className={classes.btn}>Create Array</button>
        <div className={classes['slider__container']}>
            <p>Slow</p>
            <input onChange={handleSliderChange} className={classes.slider} type={"range"} step={"0.01"}
                   min={"0.02"} max={"1"}/>
            <p>Fast</p>
        </div>

    </div>);

    let createArraySubContent = (
        <div className={classes.content}>
            <form className={`${classes['input-group']} ${classes.divisor}`}>
                <label htmlFor={"min"}>Min Items: </label>
                <input name={"min"} id={"min"} type={"number"} min={"1"} max={"100"} defaultValue={"10"}/>
                <label htmlFor={"max"}>Max Items: </label>
                <input name={"max"} id={"max"} type={"number"} min={"1"} max={"100"} defaultValue={"20"}/>
                <button onClick={handleNewRandomArrayBtn} type={"submit"} className={classes.btn}>New Random Array</button>
            </form>
            <form className={`${classes['input-group']} ${classes.divisor}`}>
                <label htmlFor={"nums"}>Items: </label>
                <input id={"nums"} name={"nums"} type={"text"} defaultValue={"1,2,3,4,5"}/>
                <button className={classes.btn} type={"submit"}>Create Custom Array</button>
            </form>
            <button onClick={handleReturnBtn} className={classes.btn}>Return</button>
        </div>
    )

    return (
        showingMain ? mainContent : createArraySubContent
    );
}

export default SortActionMenuItems;