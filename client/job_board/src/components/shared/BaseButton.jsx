const BaseButton = ({text, type, onClick}) => {
    return (
        <button type={type} className="btn btn-primary" onClick={onClick}>
            {text}
        </button>
    );
}

export default BaseButton;