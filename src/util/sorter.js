import {
    COMPARE,
    FINAL_POS, MGS_REPLACE,
    QKS_LIMITS,
    QKS_SET_PIVOT,
    QKS_UNSET_PIVOT,
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
    // const arrayCopy = [44,64,46,36];
    const actions = [];
    quickSortEntry(arrayCopy, 0, arrayCopy.length - 1, actions);
    return actions;


}

const quickSortEntry = (array, lowPtr, highPtr, actions) => {
    if (lowPtr < highPtr) {
        const pivotIdx = partitionQkSort(array, lowPtr, highPtr, actions);
        actions.push(createAction(QKS_UNSET_PIVOT, pivotIdx));
        actions.push(createAction(FINAL_POS, pivotIdx));
        quickSortEntry(array, lowPtr, pivotIdx - 1, actions);
        quickSortEntry(array, pivotIdx + 1, highPtr, actions);

    } else if (lowPtr === highPtr) {
        console.log(`LOWPTR: ${lowPtr}, HIGHPTR: ${highPtr}`);
        actions.push(createAction(FINAL_POS, lowPtr));
    }
}

const partitionQkSort = (array, lowPtr, highPtr, actions) => {
    const pivot = array[highPtr].num;
    actions.push(createAction(QKS_SET_PIVOT, highPtr));
    let i = lowPtr;
    let j = highPtr;

    actions.push(createAction(QKS_LIMITS, i));

    while (i < j) {
        while (array[i].num < pivot) {
            i++;

            if (j !== highPtr) {
                actions.push(createAction(QKS_LIMITS, i, j));
            } else {
                actions.push(createAction(QKS_LIMITS, i));
            }
        }

        while (array[j].num >= pivot && j > lowPtr) {
            j--;
            if (i < j) {
                actions.push(createAction(QKS_LIMITS, i, j));
            }

        }

        if (i < j) {
            actions.push(createAction(SWAP_INIT, i, j));
            swap(array, i, j);
            actions.push(createAction(SWAP_END, i, j));
        }
    }

    actions.push(createAction(SWAP_INIT, i, highPtr));
    swap(array, i, highPtr);
    actions.push(createAction(SWAP_END, i, highPtr));
    return i;


}

export const mergeSort = (array) => {

    const arrayCopy = [...array];
    const actions = [];
    // const arrayCopy = [3, 7, 1, 9, 13, 43, 5, 2, 15, 12, 20, 21, 22, 30, 29, 26, 41, 69, 99, 91, 90, 54];
    // const arrayCopy = [7, 3, 1, 9, 13, 43, 5];
    // const arrayCopy = [1,2,3,4,5];
    // const arrayCopy = [5,4,3,2,1];
    // console.log(`Original Array: ${JSON.stringify(arrayCopy)}`);
    mergeSortEntry(arrayCopy, 0, arrayCopy.length - 1, actions);
    // console.log(`Sorted Array: ${JSON.stringify(arrayCopy)}`);

    // console.log(JSON.stringify(actions));
    return actions;

}

const mergeSortEntry = (array, lowIdx, highIdx, actions) => {
    if (lowIdx >= highIdx) {
        return;
    }
    const middleIdx = Math.floor(lowIdx + ((highIdx - lowIdx) / 2));

    mergeSortEntry(array, lowIdx, middleIdx, actions);
    mergeSortEntry(array, middleIdx + 1, highIdx, actions);
    merge(array, lowIdx, middleIdx, highIdx, actions);
}

const merge = (array, lowIdx, middleIdx, highIdx, actions) => {
    const tempArr = [];

    let leftIdx = lowIdx;
    let rightIdx = middleIdx + 1;


    while (leftIdx <= middleIdx && rightIdx <= highIdx) {
        console.log(`left idx : ${leftIdx}, rightIdx: ${rightIdx}`);
        actions.push(createAction(COMPARE, leftIdx, rightIdx));
        if (array[leftIdx].num < array[rightIdx].num) {
            tempArr.push(array[leftIdx]);
            leftIdx++;

        } else {
            tempArr.push(array[rightIdx]);
            rightIdx++;
        }
    }

    while (leftIdx <= middleIdx) {
        tempArr.push(array[leftIdx]);
        leftIdx++;
    }

    while (rightIdx <= highIdx) {
        tempArr.push(array[rightIdx]);
        rightIdx++;
    }


    for (let i = 0, mainArrIdx = lowIdx; i < tempArr.length; i++, mainArrIdx++) {
        console.log(`I: ${i}, MAINARRIDX: ${mainArrIdx}`);
        array[mainArrIdx] = tempArr[i];
        actions.push(createAction(MGS_REPLACE, tempArr[i], mainArrIdx));

        if(lowIdx === 0 && highIdx === array.length - 1) {
            actions.push(createAction(FINAL_POS, mainArrIdx));
        }
    }
}

const createAction = (actionType, ...args) => {

    if (actionType === MGS_REPLACE) {
        return {
            actionType: actionType,
            replacer: args[0],
            indexes: args.slice(1)
        }
    } else {
        return {
            actionType,
            indexes: [...args]
        }
    }

}

const swap = (array, idxOne, idxTwo) => {


    if (idxOne === idxTwo)
        return;

    let temp = array[idxOne];
    array[idxOne] = array[idxTwo];
    array[idxTwo] = temp;

}