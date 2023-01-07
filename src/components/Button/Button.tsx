import "./styles.css";

type Props = {
    label: string;
    onClick: () => void;
    type: "small" | "big";
};

const Button = ({ label, onClick, type }: Props) => {
    return (
        <button
            style={{ width: type === "small" ? "5em" : "8em" }}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;
