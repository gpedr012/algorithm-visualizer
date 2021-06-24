import React, {useEffect, useState} from "react";
import classes from "./SortVisualization.module.css"
import Bar from "./Bar/Bar";
import {createArrayOfBars} from "../../util/utils";
import {bubbleSort} from "../../util/sorter";
import ActionMenu from "../ActionMenu/ActionMenu";
import {COMPARE, IDLE, SWAP_END, SWAP_INIT} from "../../util/sortingStates";

const SortVisualization = () => {

    const [barsArray, setBarsArray] = useState([]);
    const [progressionIndex, setProgressionIndex] = useState(0);
    const [startedVisualization, setStartedVisualization] = useState(false);
    const [actionsList, setActionsList] = useState([]);

    useEffect(() => {

        let arr = createArrayOfBars(4);

        setBarsArray(arr);
    }, [])

    useEffect(() => {

        if (startedVisualization && progressionIndex < actionsList.length) {

            setTimeout(() => {

                console.log(`Currently at:\n ${JSON.stringify(actionsList[progressionIndex])}`);
                const currentAction = actionsList[progressionIndex];
                cleanUpAtIndex(progressionIndex);
                processAction(currentAction);
                setProgressionIndex(oldV => oldV + 1);


            }, 1000)
        }

    }, [startedVisualization, progressionIndex, actionsList])

    const cleanUpAtIndex = (index) => {

        let barOne;
        let barTwo;
        let changed = false;

        if (index === 0) {
            return;
        }

        if (actionsList[index - 1].idxOne !== actionsList[index].idxOne) {
            const idx = actionsList[index - 1].idxOne
            barOne = barsArray[idx];
            barOne = {idx, data: {...barOne, curState: IDLE}};
            changed = true;
        }

        if (actionsList[index - 1].idxTwo !== actionsList[index].idxTwo) {
            const idx = actionsList[index - 1].idxTwo;
            barTwo = barsArray[idx];
            barTwo = {idx, data: {...barTwo, curState: IDLE}};
            changed = true;
        }
        if (changed) {
            setBarsArray(oldV => {
                let newV = [...oldV];
                if (barOne) {
                    newV[barOne.idx] = barOne.data;
                }
                if (barTwo) {
                    newV[barTwo.idx] = barTwo.data;
                }

                return newV;
            });
        }

    }


    const processAction = (action) => {
        const actionType = action.actionType;
        const indexOne = action.idxOne;
        const indexTwo = action.idxTwo;

        switch (actionType) {
            case COMPARE:
            case SWAP_INIT:
                setBarsArray((oldArr) => {
                    const newArray = [...oldArr];
                    newArray[indexOne].curState = actionType;
                    newArray[indexTwo].curState = actionType;

                    return newArray;
                });
                break;

            case SWAP_END:
                setBarsArray((oldArr) => {
                    const newArray = [...oldArr];
                    const indexOneObj = {...oldArr[indexOne], num: oldArr[indexTwo].num};
                    const indexTwoObj = {...oldArr[indexTwo], num: oldArr[indexOne].num};

                    newArray[indexOne] = indexOneObj;
                    newArray[indexTwo] = indexTwoObj;

                    return newArray
                });
                break;

            default:
                throw new Error('Default case processing action.');
        }


    }

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