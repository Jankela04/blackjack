import "./styles.css";

type Props = {
    label: string;
    onClick: () => void;
    type: "small" | "big";
    active: boolean;
};

const Button = ({ label, onClick, type, active }: Props) => {
    return (
        <button
            className={active ? "active" : "disabled"}
            style={{
                width: type === "small" ? "5em" : "8em",
            }}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
