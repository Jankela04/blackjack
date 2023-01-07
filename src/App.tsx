import { useDebugValue, useEffect, useState } from "react";
import { useDeckOfCards } from "./hooks/useDeckOfCards";
import "./assets/styles.css";
import * as type from "./utils/types";
import Card from "./components/Card";
import { Players } from "./hooks/useDeckOfCards";

function App() {
    const { getNewDeck, cards, startGame, values, drawCard, dealerPlayTurn } =
        useDeckOfCards();
    const [playing, setPlaying] = useState<boolean>(false);

    getNewDeck();
    return (
        <>
            <h1>Welcome To Blackjack</h1>
            <div className="app">
                {!playing ? (
                    <button
                        onClick={() => {
                            setPlaying(true);
                            startGame();
                        }}
                    >
                        Start Game
                    </button>
                ) : (
                    <div className="game">
                        {!cards.dealerCards.length ? (
                            <p>Loading</p>
                        ) : (
                            <>
                                <span>Dealer</span>
                                <span>Value:{values.dealer}</span>
                                <div className="dealer-cards">
                                    {cards.dealerCards.map((card) => (
                                        <Card key={card.code} card={card} />
                                    ))}
                                </div>
                                <div className="user-cards">
                                    {cards.userCards.map((card) => (
                                        <Card key={card.code} card={card} />
                                    ))}
                                </div>
                                <span>Value: {values.user}</span>
                                <div className="actions">
                                    <button
                                        onClick={() => {
                                            drawCard(Players.User);
                                        }}
                                    >
                                        Hit
                                    </button>
                                    <button
                                        onClick={() => {
                                            dealerPlayTurn();
                                        }}
                                    >
                                        Stand
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
