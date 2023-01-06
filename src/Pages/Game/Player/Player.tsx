import Card from "../../../components/Card/Card";
import { Players } from "../../../hooks/useDeckOfCards";
import { Card as TCard } from "../../../utils/types";
import "./styles.css";
import UserActions from "./UserActions";

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
                    <Card card={card} />
                ))}
            </div>
            {player == Players.User && <UserActions />}
        </div>
    );
};

export default Player;
