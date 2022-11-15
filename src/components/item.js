import classes from "./item.module.css"

function Item({value}){
    return (
        <div key={value} className={classes.item} style={{height: value + "px"}}>{value}</div>
    )
}

export default Item;