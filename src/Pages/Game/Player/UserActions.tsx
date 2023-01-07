import Button from "../../../components/Button/Button";
import { Players } from "../../../hooks/useDeckOfCards";

type Props = {
    drawCard: (player: Players) => Promise<void>;
    setDealerPlayTurn: React.Dispatch<React.SetStateAction<boolean>>;
    dealerPlayTurn: boolean;
};

const UserActions = ({
    drawCard,
    setDealerPlayTurn,
    dealerPlayTurn,
}: Props) => {
    const handleHit = () => {
        if (!dealerPlayTurn) drawCard(Players.User);
    };
    const handleStand = () => {
        if (!dealerPlayTurn) {
            drawCard(Players.Dealer);
            setDealerPlayTurn(true);
        }
    };

    return (
        <div className="user-actions">
            <Button label={"Hit"} onClick={handleHit} type={"small"} />
            <Button label={"Stand"} onClick={handleStand} type={"small"} />
        </div>
    );
};

export default UserActions;
