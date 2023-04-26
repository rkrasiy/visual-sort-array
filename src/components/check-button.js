
export default function CheckButton({ name, onChange, isChecked }){
    const changeHandler = () => {
        onChange(name)
    }

    return (                    
        <button key={ name } className={`inline-flex  flex-row m-2 px-3 w-32 h-10 justify-center py-1 items-center rounded-md  gap-1 font-medium text-lg hover:bg-violet-800 hover:text-white ${isChecked === name ? 'bg-violet-800 text-white' : 'bg-slate-100 text-violet-800'}`} onClick={changeHandler}>
            { name }
        </button>
    )
}