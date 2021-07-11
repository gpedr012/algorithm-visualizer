import {
    COMPARE,
    FINAL_POS,
    QKS_LEFT_WALL,
    QKS_RIGHT_WALL,
    QKS_SET_PIVOT, QKS_UNSET_PIVOT,
    SET_PIVOT,
    SWAP_END,
    SWAP_INIT
} from "./sortingStates";

export const bubbleSort = (array) => {
    const arrayCopy = [...array];
    let actions = [];

    for (let i = 0; i < arrayCopy.length - 1; i++) {
        let j;
        for (j = 0; j < arrayCopy.length - i - 1; j++) {
            actions.push(createAction(COMPARE, j, j + 1));
            if (arrayCopy[j].num > arrayCopy[j + 1].num) {
                actions.push(createAction(SWAP_INIT, j, j + 1));
                swap(arrayCopy, j, j + 1);
                actions.push(createAction(SWAP_END, j, j + 1));
            }

        }
        actions.push(createAction(FINAL_POS, j));
    }

    actions.push(createAction(FINAL_POS, 0));

    return actions;

}

export const selectionSort = (array) => {
    const arrayCopy = [...array];
    let actions = [];

    let i;
    for (i = 0; i < arrayCopy.length; i++) {
        let minIdx = i;
        for (let j = i; j < arrayCopy.length; j++) {

            actions.push(createAction(COMPARE, minIdx, j));
            if (arrayCopy[j].num < arrayCopy[minIdx].num) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            actions.push(createAction(SWAP_INIT, minIdx, i));
            swap(arrayCopy, minIdx, i);
            actions.push(createAction(SWAP_END, minIdx, i));
            actions.push(createAction(FINAL_POS, i));

        } else {
            actions.push(createAction(FINAL_POS, i));
        }
    }

    return actions;
}

export const insertionSort = (array) => {
    const arrayCopy = [...array];
    const actions = [];
    let j, i;
    actions.push(createAction(FINAL_POS, 0));
    for (i = 1; i < arrayCopy.length; i++) {
        let tempObj = arrayCopy[i];
        for (j = i - 1; j >= 0 && arrayCopy[j].num > tempObj.num; j--) {
            actions.push(createAction(SWAP_INIT, j + 1, j));
            arrayCopy[j + 1] = arrayCopy[j];
            actions.push(createAction(SWAP_END, j + 1, j));
        }
        actions.push(createAction(FINAL_POS, j + 1));
        arrayCopy[j + 1] = tempObj;
    }
//
    actions.push(createAction(FINAL_POS, i - 1));

    return actions;
}

export const quickSort = (array) => {

    const arrayCopy = [...array];

    quickSortEntry(arrayCopy, 0, arrayCopy.length - 1, []);


}

const quickSortEntry = (array, lowPtr, highPtr, actions) => {
    if (lowPtr < highPtr) {
        const pivotIdx = partitionQkSort(array, lowPtr, highPtr, actions);
        actions.push(createAction(QKS_UNSET_PIVOT, pivotIdx));
        quickSortEntry(array, lowPtr, pivotIdx, actions);
        quickSortEntry(array, pivotIdx + 1, highPtr, actions);

    }
}

const partitionQkSort = (array, lowPtr, highPtr, actions) => {
    const pivot = array[highPtr]
    actions.push(createAction(QKS_SET_PIVOT, highPtr));
    let i = lowPtr - 1;
    let j = highPtr + 1;

    while (true) {
        do {
            i++;
            actions.push(createAction(QKS_LEFT_WALL, i));
        } while (array[i] < pivot)
        do {
            j--;
            actions.push(createAction(QKS_RIGHT_WALL, j));
        } while (array[j] > pivot)
        if (i >= j) {
            return j;
        }

        actions.push(createAction(SWAP_INIT, i, j));
        swap(array, i, j);
        actions.push(createAction(SWAP_END, i, j));
    }

}

const createAction = (actionType, ...index) => {

    return {
        actionType,
        indexes: [...index]
    }

}

const swap = (array, idxOne, idxTwo) => {


    if (idxOne === idxTwo)
        return;

    let temp = array[idxOne];
    array[idxOne] = array[idxTwo];
    array[idxTwo] = temp;

}