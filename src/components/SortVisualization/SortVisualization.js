import React, {useEffect, useState} from "react";
import classes from "./SortVisualization.module.css"
import Bar from "./Bar/Bar";
import {createArrayOfBars} from "../../util/utils";
import ActionMenu from "../ActionMenu/ActionMenu";
import {COMPARE, FINAL_POS, IDLE, SWAP_END, SWAP_INIT} from "../../util/sortingStates";
import SortActionMenuItems from "./SortActionMenuItems/SortActionMenuItems";
import {quickSort} from "../../util/sorter";

const SortVisualization = (props) => {

    const [barsArray, setBarsArray] = useState([]);
    const [progressionIndex, setProgressionIndex] = useState(0);
    const [startedVisualization, setStartedVisualization] = useState(false);
    const [actionsList, setActionsList] = useState([]);
    const [animSpeed, setAnimSpeed] = useState(500);

    useEffect(() => {
        setBarsArray(createArrayOfBars(20));

    }, [])

    useEffect(() => {

        if (startedVisualization && progressionIndex < actionsList.length) {

            setTimeout(() => {
                const currentAction = actionsList[progressionIndex];
                cleanUpPreviousAction(progressionIndex);
                processAction(currentAction);
                setProgressionIndex(oldV => oldV + 1);


            }, animSpeed)
        } else if (startedVisualization) {
            setStartedVisualization(false);
        }

    }, [startedVisualization, progressionIndex, actionsList])

    const cleanUpPreviousAction = (index) => {

        const newBars = [];

        if (index === 0 || actionsList[index - 1].actionType === FINAL_POS) {
            return;
        }

        for (let i = 0; i < actionsList[index].indexes.length; i++) {
            if(actionsList[index - 1].indexes[i] !== actionsList[index].indexes[i]) {
                const idx = actionsList[index - 1].indexes[i];
                let newBar = barsArray[idx];
                const finalized = newBar.hasFinalPos;
                newBar = {idx, data:{...newBar, curState: finalized ? FINAL_POS : IDLE}};
                newBars.push(newBar);
            }
        }

        if(newBars.length !== 0) {
            setBarsArray(oldV => {
                let newV = [...oldV];
                for (const bar of newBars) {
                    newV[bar.idx] = bar.data;
                }

                return newV;
            })
        }

    }


    const processAction = (action) => {
        const actionType = action.actionType;
        // const indexOne = action.idxOne;
        // const indexTwo = action.idxTwo;
        const indexes = action.indexes;

        switch (actionType) {
            case COMPARE:
            case SWAP_INIT:

                setBarsArray((oldArr) => {
                    const newArray = [...oldArr];
                    for (const idx of indexes) {

                        newArray[idx] = {...newArray[idx], curState: actionType};

                    }

                    return newArray;
                });

                break;
            case FINAL_POS:
                setBarsArray(oldArr => {
                    const newArray = [...oldArr];
                    newArray[indexes[0]] = {...newArray[indexes[0]], curState: actionType, hasFinalPos: true};

                    return newArray;
                })

                break;

            case SWAP_END:
                setBarsArray((oldArr) => {
                    const indexOne = indexes[0], indexTwo = indexes[1];
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
        setActionsList(props.algorithm.func((barsArray)));
        setStartedVisualization(true);


    }

    const handleNewArray = (array) => {
        setStartedVisualization(false);
        setProgressionIndex(0);
        setBarsArray(array);

    }

    const handleSpeedChange = (val) => {
         setAnimSpeed(val);
    }


    return (

        <React.Fragment>
            <div className={classes.visualization}>
                {barsArray.map(item => {
                    return <Bar barState={item.curState} key={item.key} height={item.num} barName={item.num}/>
                })}
            </div>
            <ActionMenu>
                <SortActionMenuItems animSpeed={animSpeed} handleSpeedChange={handleSpeedChange} algorithm={props.algorithm} sort={sort} handleNewArray={handleNewArray}/>
            </ActionMenu>
        </React.Fragment>


    )
}

export default SortVisualization;