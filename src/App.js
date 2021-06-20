import classes from "./App.module.css";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
    return (
        <div className={classes.content}>
            <Sidebar/>
            <MainContent/>
        </div>
    );
}

export default App;
