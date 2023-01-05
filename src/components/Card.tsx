import React from "react";
import { Card as CardType } from "../utils/types";

type CardProps = {
    card: CardType;
};

const Card: React.FC<CardProps> = ({ card }) => {
    return <img className="card" src={card.image} alt="" />;
};

export default Card;
