import classes from "./App.module.css";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/Sidebar/Sidebar";
import {useState} from "react";
import {algorithms} from "./util/utils";

function App() {

    const [algorithm, setAlgorithm] = useState(algorithms.MERGESORT);

    const handleAlgoSelection = (algorithm) => {
        console.log(algorithm)
        setAlgorithm(algorithm);

    }

    return (
        <div className={classes.content}>
            <Sidebar activeAlgorithm={algorithm} handleAlgoSelection={handleAlgoSelection}/>
            <MainContent algorithm={algorithm}/>
        </div>
    );
}

export default App;
