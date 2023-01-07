import { useEffect, useState } from "react";
import axios from "axios";
import * as type from "../utils/types";

export enum Players {
    User,
    Dealer,
}

export const useDeckOfCards = () => {
    const [deck, setDeck] = useState<type.Deck>();
    const [cards, setCards] = useState<type.Game>({
        userCards: [],
        dealerCards: [],
    });
    const [values, setValues] = useState({
        user: 0,
        dealer: 0,
    });

    useEffect(() => {
        //updates values of cards for user and dealer
        const UserValueArr = cards.userCards.map((card) => {
            return getValue(card.code);
        });

        const UserValue = UserValueArr.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
        if (UserValue === 21) {
            gameOver(Players.User);
        } else if (UserValue >= 22) {
            gameOver(Players.Dealer);
        }
        const DealerValueArr = cards.dealerCards.map((card) => {
            return getValue(card.code);
        });

        const DealerValue = DealerValueArr.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
        setValues({
            user: UserValue,
            dealer: DealerValue,
        });
    }, [cards.userCards, cards.dealerCards]);

    const getValue = (code: string): number => {
        //gets value from card (8C => 8, K,Q,J => 10)
        if (code[0] === "0") return 10;

        const value = parseInt(code);

        if (!isNaN(value)) return value;
        else if (code[0] === "A") {
            return 11 | 1;
        } else return 10;
    };

    const getNewDeck = () => {
        useEffect(() => {
            axios
                .get(
                    "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
                )
                .then((res) => {
                    setDeck(res.data);
                });
        }, []);
    };

    const startGame = async () => {
        const res = await axios.get(
            `https://www.deckofcardsapi.com/api/deck/${deck?.deck_id}/draw/?count=3`
        );
        setCards({
            userCards: [res.data.cards[0], res.data.cards[1]],
            dealerCards: [res.data.cards[2]],
        });
    };

    const drawCard = async (player: Players) => {
        //draws card to either user or dealer
        const res = await axios.get(
            `https://www.deckofcardsapi.com/api/deck/${deck?.deck_id}/draw/?count=1`
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
    };

    const gameOver = (winner: Players) => {
        console.log(winner);
        //todo display message;
    };

    const evaluate = () => {
        //todo check if user won or lost
        console.log("done");
    };
    let intervalId: number;

    function dealerPlayTurn() {
        if (values.dealer >= 17) {
            return;
        }
        drawCard(Players.Dealer).then(() => {
            setTimeout(dealerPlayTurn, 2000);
        });
    }

    return {
        deck,
        getNewDeck,
        cards,
        startGame,
        values,
        drawCard,
        dealerPlayTurn,
    };
};
