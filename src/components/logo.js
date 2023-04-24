import logo from '../logo.svg';

function Logo (){
    return (
        <div className="logo">
            <img src={logo} className="App-logo" alt="logo" style={{width: "62px"}} />
            <h1>Array sort visualization</h1>
        </div>
    )

}

export default Logo;