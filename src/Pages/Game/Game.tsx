import { useDeckOfCards } from "../../hooks/useDeckOfCards";
import Player from "./Player/Player";
import "./styles.css";
import { Players } from "../../hooks/useDeckOfCards";
import UserActions from "./Player/UserActions";
import { useEffect } from "react";

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
    } = useDeckOfCards();

    startGame();

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
            <div className="message">{message}</div>
            <Player
                player={Players.User}
                value={userValue}
                cards={cards.userCards}
            />
            <UserActions
                drawCard={drawCard}
                setDealerPlayTurn={setDealerPlayTurn}
                dealerPlayTurn={dealerPlayTurn}
            />
        </div>
    );
};

export default Game;
