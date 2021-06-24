import {COMPARE, FINAL_POS, SWAP_END, SWAP_INIT} from "./sortingStates";

export const bubbleSort = (array) => {
    const arrayCopy = [...array];
    let actions = [];

    for (let i = 0; i < arrayCopy.length - 1; i++) {
        for (let j = 0; j < arrayCopy.length - i - 1; j++) {
            actions.push(createAction(COMPARE, j, j+1));
            if(arrayCopy[j].num > arrayCopy[j+1].num) {
                actions.push(createAction(SWAP_INIT, j, j+1));
                swap(arrayCopy, j, j+1);
                actions.push(createAction(SWAP_END, j, j+1));
            }

        }

    }

    actions.push(createAction(FINAL_POS, null, null));

    return actions;

}

export const selectionSort = (array) => {
    const arrayCopy = [...array];
    let actions = [];

    for (let i = 0; i < arrayCopy.length; i++) {
        let minIdx = i;
        for (let j = i; j < arrayCopy.length; j++) {

            actions.push(createAction(COMPARE, minIdx, j));
            if(arrayCopy[j].num < arrayCopy[minIdx].num) {
                minIdx = j;
            }
        }
        if(minIdx !== i) {
            actions.push(createAction(SWAP_INIT, minIdx, i));
            swap(arrayCopy, minIdx, i);
            actions.push(createAction(SWAP_END, minIdx, i));

        }
    }

    actions.push(createAction(FINAL_POS, null, null));

    return actions;
}

const createAction = (actionType, idxOne, idxTwo) => {

    return {
        actionType,
        idxOne,
        idxTwo
    }

}

const swap = (array, idxOne, idxTwo) => {

    if(idxOne === idxTwo)
        return;

    let temp = array[idxOne];
    array[idxOne] = array[idxTwo];
    array[idxTwo] = temp;

}