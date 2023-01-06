import { useDeckOfCards } from "../../hooks/useDeckOfCards";
import Player from "./Player/Player";
import "./styles.css";
import { Players } from "../../hooks/useDeckOfCards";

const Game = () => {
    const { startGame, cards, userValue, dealerValue } = useDeckOfCards();

    startGame();

    return (
        <div className="game">
            <Player
                player={Players.Dealer}
                value={dealerValue}
                cards={cards.dealerCards}
            />
            <div className="message"></div>
            <Player
                player={Players.User}
                value={userValue}
                cards={cards.userCards}
            />
        </div>
    );
};

export default Game;
