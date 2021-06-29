import {IDLE} from "./sortingStates";
import {bubbleSort, insertionSort, selectionSort} from "./sorter";

export const createArrayOfBars = (size) => {
    const MIN = 1;
    const MAX = 100;
    let arr = [];

    for (let i = 0; i < size; i++) {
        let randNum = Math.floor(Math.random() * (MAX - MIN) + MIN);
        arr.push(createBar(i, randNum, IDLE));
    }
    return arr;

}

export const algorithms = {
    BUBBLE: {code: 0, name: 'Bubble', func: bubbleSort},
    SELECTION: {code: 1, name: 'Selection', func: selectionSort},
    INSERTION: {code: 2, name: 'Insertion', func: insertionSort}
}

const createBar = (key, num, curState) => {

    return {
        key,
        num,
        curState,
        hasFinalPos: false
    }

}