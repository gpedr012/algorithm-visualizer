import React, {useEffect, useState} from "react";
import classes from "./SortVisualization.module.css"
import Bar from "./Bar/Bar";
import {createArrayOfBars} from "../../util/utils";
import {bubbleSort, selectionSort, insertionSort} from "../../util/sorter";
import ActionMenu from "./ActionMenu/ActionMenu";
import {COMPARE, FINAL_POS, IDLE, SWAP_END, SWAP_INIT} from "../../util/sortingStates";

const SortVisualization = (props) => {

    const [barsArray, setBarsArray] = useState([]);
    const [progressionIndex, setProgressionIndex] = useState(0);
    const [startedVisualization, setStartedVisualization] = useState(false);
    const [actionsList, setActionsList] = useState([]);

    useEffect(() => {

        let arr = createArrayOfBars(25);

        setBarsArray(arr);
    }, [])

    useEffect(() => {

        if (startedVisualization && progressionIndex < actionsList.length) {

            setTimeout(() => {

                console.log(`Currently at:\n ${JSON.stringify(actionsList[progressionIndex])}`);
                const currentAction = actionsList[progressionIndex];
                cleanUpPreviousAction(progressionIndex);
                processAction(currentAction);
                setProgressionIndex(oldV => oldV + 1);


            }, 50)
        }

    }, [startedVisualization, progressionIndex, actionsList])

    const cleanUpPreviousAction = (index) => {

        let barOne;
        let barTwo;
        let changed = false;

        if (index === 0 || actionsList[index - 1].actionType === FINAL_POS) {
            return;
        }

        if (actionsList[index - 1].idxOne !== actionsList[index].idxOne) {
            const idx = actionsList[index - 1].idxOne
            barOne = barsArray[idx];
            const isFinalized = barOne.hasFinalPos;
            barOne = {idx, data: {...barOne, curState: isFinalized ? FINAL_POS : IDLE}};
            changed = true;
        }

        if (actionsList[index - 1].idxTwo !== actionsList[index].idxTwo) {
            const idx = actionsList[index - 1].idxTwo;
            barTwo = barsArray[idx];
            const isFinalized = barTwo.hasFinalPos;
            barTwo = {idx, data: {...barTwo, curState: isFinalized ? FINAL_POS : IDLE}};
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
                    newArray[indexOne] = {...newArray[indexOne], curState: actionType};
                    newArray[indexTwo] = {...newArray[indexTwo], curState: actionType};

                    return newArray;
                });

                break;
            case FINAL_POS:
                setBarsArray(oldArr => {
                    const newArray = [...oldArr];
                    newArray[indexOne] = {...newArray[indexOne], curState: actionType, hasFinalPos: true};

                    return newArray;
                })

                break;

            case SWAP_END:
                setBarsArray((oldArr) => {
                    const newArray = [...oldArr];
                    const temp = {...newArray[indexOne]};
                    newArray[indexOne] = {...newArray[indexTwo]};
                    newArray[indexTwo] = temp;

                    return newArray
                });
                break;

            default:
                throw new Error('Default case processing action.');
        }


    }

    const sort = () => {
        console.log(props.algorithm);
        setActionsList(props.algorithm.func((barsArray)));
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
                    {props.algorithm.name}
                    <button onClick={sort}>Sort</button>
            </ActionMenu>
        </React.Fragment>


    )
}

export default SortVisualization;