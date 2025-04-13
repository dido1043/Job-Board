const InputField = ({ label, type, name, value, onChange, placeholder }) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input
                type={type}
                className="form-control"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
            />
        </div>
    );
}

export default InputField;