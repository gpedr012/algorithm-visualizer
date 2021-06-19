import logo from './logo.svg';
import classes from "./App.module.css";
import MainContent from "./components/UI/MainContent/MainContent";
import Sidebar from "./components/UI/Sidebar/Sidebar";

function App() {
    return (
        <div className={classes.content}>
            <Sidebar/>
            <MainContent/>
        </div>
    );
}

export default App;
