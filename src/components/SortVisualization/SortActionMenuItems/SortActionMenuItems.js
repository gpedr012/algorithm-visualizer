import React, {useState} from "react";
import classes from "./SortActionMenuItems.module.css";
import {createArrayOfBars} from "../../../util/utils";

const MINIMUM = 1;
const MAXIMUM = 300;

//TODO: Only allow to upper limit when inserting items manually in custom array.
const SortActionMenuItems = (props) => {

    const [showingMain, setShowingMain] = useState(true);
    const [minInputVal, setMinInputVal] = useState(10);
    const [maxInputVal, setMaxInputVal] = useState(20);
    const [customArrItems, setCustomArrItems] = useState("1,2,3,4,5");
    const [errorMsg, setErrorMsg] = useState("");


    const handleReturnBtn = () => {
        setShowingMain(true);
    }

    const handleCreateArrayBtn = () => {
        setShowingMain(false);
    }

    const handleNewRandomArrayBtn = (evt) => {
        evt.preventDefault();

        props.handleNewArray(createArrayOfBars(null, minInputVal, maxInputVal, null));


    }

    const handleSliderChange = (evt) => {
        console.log(evt.target.value);
        props.handleSpeedChange(evt.target.value);

    }

    const handleInputChange = (args, evt) => {
        const val = +evt.target.value;
        const type = args.t;
        const func = args.f;

        if (type === "min" && val > maxInputVal && val <= MAXIMUM) {
            setMaxInputVal(val);
            func(val);
        } else if (type === "max" && val < minInputVal && val >= MINIMUM) {
            setMinInputVal(val)
            func(val);
        } else if (val < MINIMUM) {
            func(MINIMUM);
        } else if (val > MAXIMUM) {
            func(MAXIMUM);
        } else {
            func(val);
        }
    }

    const handleCustomChange = (evt) => {
        setCustomArrItems(evt.target.value);
    }

    const validateCustomArr = (evt) => {
        evt.preventDefault();
        setErrorMsg("");
        let error = false;

        const splitItems = customArrItems.split(",");
        const finalItems = [];
        splitItems.forEach(item => {
            if(item === '') {
                setErrorMsg( "Erroneous input (extra comma perhaps).");
                error = true;
            }
            const number = +item;
            console.log(`Item: ${item}, Number: ${number}`);
            console.log(Number.isInteger(+item));
            if(!Number.isInteger(number) || number > MAXIMUM || number < MINIMUM) {
                setErrorMsg("Enter only numbers between 1-100 inclusive.");
                error = true;
            }

            finalItems.push(number);

        });

        if(!error) {
            props.handleNewArray(createArrayOfBars(null, null, null, finalItems));
        }
    }

    let mainContent = (<div className={classes.content}>
        {props.algorithm.name}
        <button className={classes.btn} onClick={props.sort}>Sort</button>
        <button onClick={handleCreateArrayBtn} className={classes.btn}>Create Array</button>
        <div className={classes['slider__container']}>
            <p>Fast</p>
            <input onChange={handleSliderChange} className={classes.slider} type={"range"} step={"10"}
                   min={"1"} max={"1000"} value={props.animSpeed}/>
            <p>Slow</p>
        </div>
    </div>);

    let createArraySubContent = (
        <div className={classes.content}>
            <form className={`${classes['input-group']} ${classes.divisor}`}>
                <label htmlFor={"min"}>Min Items: </label>
                <input value={minInputVal} onChange={handleInputChange.bind(null, {t: "min", f: setMinInputVal})}
                       name={"min"} id={"min"} type={"number"} min={`${MINIMUM}`} max={`${MAXIMUM}`}
                       defaultValue={"10"}/>
                <label htmlFor={"max"}>Max Items: </label>
                <input value={maxInputVal} onChange={handleInputChange.bind(null, {t: "max", f: setMaxInputVal})}
                       name={"max"} id={"max"} type={"number"} min={`${MINIMUM}`} max={`${MAXIMUM}`}
                       defaultValue={"20"}/>
                <button onClick={handleNewRandomArrayBtn} type={"submit"} className={classes.btn}>New Random Array
                </button>
            </form>
            <form className={`${classes['input-group']} ${classes.divisor}`}>
                <label htmlFor={"nums"}>Items: </label>
                <input id={"nums"} name={"nums"} type={"text"} value={customArrItems} onChange={handleCustomChange}/>
                <button className={classes.btn} type={"submit"} onClick={validateCustomArr}>Create Custom Array</button>
            </form>
            <button onClick={handleReturnBtn} className={`${classes.btn}`}>Return</button>
            <div className={classes['input-message']}>
                {errorMsg}
            </div>
        </div>
    )

    return (
        showingMain ? mainContent : createArraySubContent
    );
}

export default SortActionMenuItems;