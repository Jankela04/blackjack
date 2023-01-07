import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import { useNavigate } from "react-router-dom";

import "./styles.css";

type Props = {};

const Home = (props: Props) => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <Title />
            <Button
                active={true}
                label={"Start Game"}
                type={"big"}
                onClick={() => {
                    navigate("/game");
                }}
            />
        </div>
    );
};

export default Home;
