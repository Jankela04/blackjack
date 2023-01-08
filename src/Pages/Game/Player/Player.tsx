import Card from "../../../components/Card/Card";
import { Players } from "../../../hooks/useDeckOfCards";
import useChips from "../../../utils/chipsStore";
import { Card as TCard } from "../../../utils/types";
import "./styles.css";

type Props = {
    player: string;
    value: number;
    cards: TCard[];
};

const Player = ({ player, value, cards }: Props) => {
    const chips = useChips((state) => state.chips);
    return (
        <div className="player">
            <div className="info">
                <p>
                    {player}
                    <span>{value}</span>
                </p>
                {player == Players.User && <p className="chips">¢{chips}</p>}
            </div>
            <div className="cards">
                {cards.map((card) => (
                    <Card key={card.code} card={card} />
                ))}
            </div>
        </div>
    );
};

export default Player;
