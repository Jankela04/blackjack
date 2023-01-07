import Card from "../../../components/Card/Card";
import { Card as TCard } from "../../../utils/types";
import "./styles.css";

type Props = {
    player: string;
    value: number;
    cards: TCard[];
};

const Player = ({ player, value, cards }: Props) => {
    return (
        <div className="player">
            <p>
                {player}
                <span>{value}</span>
            </p>
            <div className="cards">
                {cards.map((card) => (
                    <Card key={card.code} card={card} />
                ))}
            </div>
        </div>
    );
};

export default Player;
