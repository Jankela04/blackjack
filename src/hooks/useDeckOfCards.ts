import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import * as type from "../utils/types";
import useChips from "../utils/chipsStore";

export enum Players {
    User = "User",
    Dealer = "Dealer",
}

export const useDeckOfCards = () => {
    const wonBet = useChips((state) => state.wonBet);
    const draw = useChips((state) => state.draw);
    const [deck, setDeck] = useState<string>();
    const [cards, setCards] = useState<type.Game>({
        userCards: [],
        dealerCards: [],
    });
    const [dealerPlayTurn, setDealerPlayTurn] = useState(false);
    const [message, setMessage] = useState("");
    const [playing, setPlaying] = useState(true);

    const userValue = useMemo(() => {
        return cards.userCards
            .map((card) => getValue(card.code))
            .reduce((acc, currentValue) => acc + currentValue, 0);
    }, [cards.userCards]);

    const dealerValue = useMemo(() => {
        return cards.dealerCards
            .map((card) => getValue(card.code))
            .reduce((acc, currentValue) => acc + currentValue, 0);
    }, [cards.dealerCards]);

    useEffect(() => {
        // recursive function that draws cards to dealer
        if (dealerPlayTurn) {
            if (dealerValue >= 17) {
                setDealerPlayTurn(false);
                evaluate();
                return;
            }
            const timeoutID = setTimeout(() => drawCard(Players.Dealer), 1000);
            return () => clearTimeout(timeoutID);
        }
    });

    function getValue(code: string): number {
        //gets value from card (8C => 8, K,Q,J => 10)
        if (code[0] === "0") return 10;

        const value = parseInt(code);

        if (!isNaN(value)) return value;
        else if (code[0] === "A") {
            return 11 | 1;
        } else return 10;
    }

    function getNewDeck() {
        axios
            .get(
                "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
            )
            .then((res) => {
                setDeck(res.data);
            });
    }

    const startGame = () => {
        // setPlaying(true);
        useEffect(() => {
            axios
                .get(
                    "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
                )
                .then((res) => {
                    const deckID = res.data.deck_id;
                    setDeck(deckID);
                    axios
                        .get(
                            `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=3`
                        )
                        .then((res) => {
                            setCards({
                                userCards: [
                                    res.data.cards[0],
                                    res.data.cards[2],
                                ],
                                dealerCards: [res.data.cards[1]],
                            });
                        });
                });
        }, []);
    };

    const drawCard = async (player: Players) => {
        //draws card to either user or dealer
        if (playing) {
            const res = await axios.get(
                `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
            );
            if (player === Players.Dealer) {
                setCards((prev) => {
                    return {
                        userCards: prev.userCards,
                        dealerCards: [...prev.dealerCards, res.data.cards[0]],
                    };
                });
            } else {
                setCards((prev) => {
                    return {
                        userCards: [...prev.userCards, res.data.cards[0]],
                        dealerCards: prev.dealerCards,
                    };
                });
            }
        }
    };

    const gameOver = (GameResult: Players | (true & {})) => {
        setDealerPlayTurn(false);
        setPlaying(false);
        if (GameResult === true) {
            setMessage("It's a Draw!");
            draw();
        } else {
            setMessage(`${GameResult} Won!`);
            if (GameResult === Players.User) wonBet();
        }
    };

    const evaluate = () => {
        if (dealerValue >= 22) return gameOver(Players.User);

        if (userValue > dealerValue) {
            gameOver(Players.User);
        } else if (userValue < dealerValue) {
            gameOver(Players.Dealer);
        } else {
            gameOver(true);
        }
    };

    return {
        deck,
        getNewDeck,
        cards,
        startGame,
        drawCard,
        dealerPlayTurn,
        userValue,
        dealerValue,
        setDealerPlayTurn,
        message,
        setMessage,
        gameOver,
        playing,
    };
};
