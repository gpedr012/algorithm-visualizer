import {IDLE} from "./sortingStates";
import {bubbleSort, insertionSort, quickSort, selectionSort} from "./sorter";

export const createArrayOfBars = (size, minV, maxV, customNums) => {
    const MIN =  1;
    const MAX =  99;
    let arr = [];
    let newArrayLength = size;

    if(customNums) {
        for (let i = 0; i < customNums.length; i++) {
            arr.push(createBar(i, customNums[i], IDLE, IDLE));
        }

        return arr;
    }

    if(minV && maxV) {
        newArrayLength = Math.floor((Math.random() * (maxV - minV + 1)) + minV);

    }

    for (let i = 0; i < newArrayLength; i++) {
        let randNum = Math.floor((Math.random() * (MAX - MIN + 1)) + MIN);
        arr.push(createBar(i, randNum, IDLE, IDLE));
    }
    return arr;

}

export const algorithms = {
    BUBBLE: {code: 0, name: 'Bubble', func: bubbleSort},
    SELECTION: {code: 1, name: 'Selection', func: selectionSort},
    INSERTION: {code: 2, name: 'Insertion', func: insertionSort},
    QUICKSORT: {code: 3, name: 'Quicksort', func: quickSort}

}

export const createBar = (key, num, curState, revState) => {

    return {
        key,
        num,
        curState,
        revState
    }

}