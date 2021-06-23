import React, {useEffect, useState} from "react";
import classes from "./SortVisualization.module.css"
import Bar from "./Bar/Bar";
import {createArrayOfBars} from "../../util/utils";
import {bubbleSort} from "../../util/sorter";
import ActionMenu from "../ActionMenu/ActionMenu";

const SortVisualization = () => {

    const [barsArray, setBarsArray] = useState([]);
    const [progressionIndex, setProgressionIndex] = useState(0);
    const [startedVisualization, setStartedVisualization] = useState(false);
    const [actionsList, setActionsList] = useState([]);

    useEffect(() => {

        let arr = createArrayOfBars(5);

        setBarsArray(arr);
    }, [])

    useEffect(() => {

        if(startedVisualization && progressionIndex < actionsList.length) {

            setTimeout(() => {

                console.log(`Currently at:\n ${JSON.stringify(actionsList[progressionIndex])}`);
                setProgressionIndex(oldValue => oldValue + 1);

            }, 1000)

        }

    }, [startedVisualization, progressionIndex, actionsList])

    const sort = () => {
        setActionsList(bubbleSort(barsArray));
        setStartedVisualization(true);
    }

    // let array = createNewRandArray(3);
    // console.log(array);
    // //array = bubbleSort(array);
    // console.log(array);
    return (

        <React.Fragment>
            <div className={classes.visualization}>
                {barsArray.map(item => {
                    return <Bar barState={item.curState} key={item.key} height={item.num} barName={item.num}/>
                })}
            </div>
            <ActionMenu>
                <button onClick={sort}>Sort</button>
            </ActionMenu>
        </React.Fragment>


    )
}

export default SortVisualization;