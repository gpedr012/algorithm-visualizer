import {IDLE} from "./sortingStates";

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

const createBar = (key, num, curState) => {

    return {
        key,
        num,
        curState
    }

}