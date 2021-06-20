export const bubbleSort = (array) => {
    let actions = [];

    console.log("Logging the array from bubblesort", array);

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if(array[j].num > array[j+1].num) {
                swap(array, j, j+1);
            }

        }
    }

    console.log("Done sorting =>", array);

    return array;

}

const swap = (array, idxOne, idxTwo) => {

    console.log(`Swapping  idxOne:${idxOne}, idxTwo:${idxTwo} => `, array);

    let temp = array[idxOne];
    array[idxOne] = array[idxTwo];
    array[idxTwo] = temp;

    console.log("After swap", array);
}