import Item from "./item"
import classes from "../app.module.css";

export function ArrayVisualizing(props){
    const active = parseInt(props.active)
    
    return (
        <div className={classes.wrapper}>
            {
                props.items.map( (el, i) => (
                    <Item key={el.id} value={el} active={i === active}/>
                ))
            }
        </div>
    )
}