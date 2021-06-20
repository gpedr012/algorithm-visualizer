import React, {useEffect, useState} from "react";
import classes from "./SortVisualization.module.css"
import Bar from "./Bar/Bar";
import {createNewRandArray} from "../../util/utils";
import {bubbleSort} from "../../util/sorter";
/*
* Needs to receive array of objects for each bar to populate it.
* Maybe another component will be the one in charge of moving stuff around as
* the algorithm sorts
 */
const SortVisualization = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(bubbleSort(createNewRandArray(5)));
    }, [])

    // let array = createNewRandArray(3);
    // console.log(array);
    // //array = bubbleSort(array);
    // console.log(array);
    return (


        <div className={classes.visualization}>
            {items.map(item => {
                console.log("Inside the map fn",item)
                return <Bar key={item.idx} height={item.num} barName={item.num}/>
            })}
        </div>


    )
}

export default SortVisualization;