import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import useChips from "../../utils/chipsStore";
import { useState } from "react";

type Props = {};

const Home = (props: Props) => {
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    const chips = useChips((state) => state.chips);
    const addChips = useChips((state) => state.addChips);
    const placeBet = useChips((state) => state.placeBet);

    return (
        <div className="home">
            <Title />
            <div className="chips">
                <span>Chips: {chips}</span>
                <Button
                    active={true}
                    label={"Add Chips"}
                    type={"big"}
                    onClick={() => {
                        addChips();
                    }}
                />
            </div>

            <div className="start-game">
                <form>
                    <label htmlFor="bet">Bet</label>
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        id="bet"
                        placeholder="Place Bet"
                        size={1}
                    />
                    <Button
                        active={true}
                        label={"Start Game"}
                        type={"big"}
                        onClick={() => {
                            const value = parseInt(inputValue);
                            if (isNaN(value)) return alert("Insert a Number");
                            if (value > chips)
                                return alert("You don't have that much chips");
                            placeBet(value);
                            navigate("/game");
                        }}
                    />
                </form>
            </div>
        </div>
    );
};

export default Home;
