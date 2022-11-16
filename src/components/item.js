import classes from "./item.module.css"

function Item(props){
    const {value, active, pos} = props;
    const {moved, id, number} = value;

    let classItem = moved ? classes.moved : classes.item
    if(active){
        classItem =  classes.active
    }

    return (
        <div key={id} className={`${classes.item} ${classItem}`} style={{height: number + "px"}}>{number}</div>
    )
}

export default Item;