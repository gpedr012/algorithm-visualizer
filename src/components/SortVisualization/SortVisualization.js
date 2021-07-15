import React, {useEffect, useState} from "react";
import classes from "./SortVisualization.module.css"
import Bar from "./Bar/Bar";
import {createArrayOfBars} from "../../util/utils";
import ActionMenu from "../ActionMenu/ActionMenu";
import {
    COMPARE,
    FINAL_POS,
    IDLE, MGS_REPLACE,
    QKS_LIMITS,
    QKS_SET_PIVOT,
    QKS_UNSET_PIVOT,
    SWAP_END,
    SWAP_INIT
} from "../../util/sortingStates";
import SortActionMenuItems from "./SortActionMenuItems/SortActionMenuItems";
import {quickSort} from "../../util/sorter";

const SortVisualization = (props) => {

    const [barsArray, setBarsArray] = useState([]);
    const [progressionIndex, setProgressionIndex] = useState(0);
    const [startedVisualization, setStartedVisualization] = useState(false);
    const [actionsList, setActionsList] = useState([]);
    const [animSpeed, setAnimSpeed] = useState(500);
    const [slimMode, setSlimMode] = useState('');

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

        for (let i = 0; i < actionsList[index - 1].indexes.length; i++) {
            if (actionsList[index - 1].indexes[i] !== actionsList[index].indexes[i]) {
                console.log(`idx for newbar: ${actionsList[index - 1].indexes[i]}`);
                const idx = actionsList[index - 1].indexes[i];
                let newBar = barsArray[idx];
                newBar = {idx, data: {...newBar, curState: newBar.revState}};
                newBars.push(newBar);
            }
        }

        if (newBars.length !== 0) {
            setBarsArray(oldArray => {
                const newArray = [...oldArray];
                for (const bar of newBars) {
                    console.log(`NEW BAR REPLACEMENT: ${JSON.stringify(bar)}`);
                    newArray[bar.idx] = bar.data;
                }

                return newArray;
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
            case QKS_LIMITS:
                setBarsArray((oldArray) => {
                    const newArray = [...oldArray];
                    for (const idx of indexes) {
                            newArray[idx] = {...newArray[idx], curState: actionType};

                    }

                    return newArray;
                });

                break;

            case QKS_SET_PIVOT:
                setBarsArray(oldArray => {
                    const newArray = [...oldArray];
                    newArray[indexes[0]] = {...newArray[indexes[0]], curState: actionType, revState: actionType};

                    return newArray;
                });

                break;

            case QKS_UNSET_PIVOT:
                setBarsArray(oldArray => {
                    const newArray = [...oldArray];
                    newArray[indexes[0]] = {...oldArray[indexes[0]], curState: IDLE, revState: IDLE};

                    return newArray;
                });

                break;

            case MGS_REPLACE:
                setBarsArray(oldArray => {
                    const newArray = [...oldArray];

                    // console.log(`REPLACER IS: ${JSON.stringify(action.replacer)}`)
                    newArray[indexes[0]] = {...newArray[indexes[0]], num: action.replacer.num, curState: actionType};



                    return newArray;
                });

                break;

            case FINAL_POS:
                setBarsArray(oldArray => {
                    const newArray = [...oldArray];
                    newArray[indexes[0]] = {...newArray[indexes[0]], curState: actionType, revState: FINAL_POS};

                    return newArray;
                })

                break;

            case SWAP_END:
                setBarsArray((oldArray) => {
                    const indexOne = indexes[0], indexTwo = indexes[1];
                    const newArray = [...oldArray];
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
        setSlimMode(() => {
            if(array.length <= 50) {
                return '';
            } else if (array.length <= 80) {
                return 'light';
            } else if (array.length <= 140) {
                return 'medium';
            } else if (array.length <= 240) {
                return 'heavy';
            } else if (array.length <= 300) {
                return 'heavier';
            } else {
                return 'heaviest';
            }
        });
        setBarsArray(array);

    }

    const handleSpeedChange = (val) => {
        setAnimSpeed(val);
    }


    return (

        <React.Fragment>
            <div className={classes.visualization}>
                {barsArray.map(item => {
                    return <Bar slimMode={slimMode} barState={item.curState} key={item.key} height={item.num}/>
                })}
            </div>
            <ActionMenu>
                <SortActionMenuItems animSpeed={animSpeed} handleSpeedChange={handleSpeedChange}
                                     algorithm={props.algorithm} sort={sort} handleNewArray={handleNewArray}/>
            </ActionMenu>
        </React.Fragment>


    )
}

export default SortVisualization;