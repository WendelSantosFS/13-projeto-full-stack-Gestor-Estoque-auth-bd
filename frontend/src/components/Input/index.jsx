



function Input ( { type, placeholder, id, name, ...rest }) {
    return <input 
        type={type}
        placeholder={placeholder}
        required

        id={id}
        name={name}

        { ...rest }
    />
}


export default Input;