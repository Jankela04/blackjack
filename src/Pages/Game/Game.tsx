import { useDeckOfCards } from "../../hooks/useDeckOfCards";
import Player from "./Player/Player";
import "./styles.css";
import { Players } from "../../hooks/useDeckOfCards";
import UserActions from "./Player/UserActions";
import { useEffect } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Game = () => {
    const {
        startGame,
        cards,
        userValue,
        dealerValue,
        drawCard,
        setDealerPlayTurn,
        gameOver,
        message,
        dealerPlayTurn,
        playing,
    } = useDeckOfCards();

    startGame();
    const navigate = useNavigate();

    useEffect(() => {
        if (userValue === 21) {
            gameOver(Players.User);
        } else if (userValue >= 21) {
            gameOver(Players.Dealer);
        }
    }, [userValue]);

    return (
        <div className="game">
            <Player
                player={Players.Dealer}
                value={dealerValue}
                cards={cards.dealerCards}
            />
            <div className="message">
                {message}
                {!playing && (
                    <Button
                        label="Play Again"
                        onClick={() => {
                            navigate("/");
                        }}
                        type={"big"}
                        active={true}
                    />
                )}
            </div>

            <Player
                player={Players.User}
                value={userValue}
                cards={cards.userCards}
            />
            <UserActions
                drawCard={drawCard}
                setDealerPlayTurn={setDealerPlayTurn}
                dealerPlayTurn={dealerPlayTurn}
                playing={playing}
            />
        </div>
    );
};

export default Game;
