import  { useId } from 'react';

export default function RadioInput({ name, onChange, isChecked }){
    const id = useId();
    const changeHandler = (e) => onChange(e.target.value)
    return (                    
        <div key={ name } className='inline-block m-2'>
            <input type="radio" name={name} value={name}
                id={id}
                onChange={changeHandler}
                checked={isChecked === name}
            />
            <label htmlFor={id} className='font-mono'>{ name }</label>
        </div>
    )
}