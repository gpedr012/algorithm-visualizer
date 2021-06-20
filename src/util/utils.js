export const createNewRandArray = (size) => {

    let arr = [];

    for (let i = 0; i < size; i++) {
        let randNum = Math.floor(Math.random() * 101 + 1);
        arr.push({idx: i, num: randNum});
    }

    console.log("Rand array is: ", arr);
    return arr;

}