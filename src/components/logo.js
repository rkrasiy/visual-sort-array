import logo from '../logo.svg';
import classes from "./item.module.css";

function Logo (){
    return (
        <div className={classes.logo}>
            <img src={logo} className="App-logo" alt="logo" style={{width: "62px"}} />
            <h1>Array sort visualization</h1>
        </div>
    )

}

export default Logo;