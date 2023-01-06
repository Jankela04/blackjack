import Button from "../../../components/Button/Button";

type Props = {};

const UserActions = (props: Props) => {
    const handleHit = () => {};
    const handleStand = () => {};

    return (
        <div className="user-actions">
            <Button label={"Hit"} onClick={handleHit} type={"small"} />
            <Button label={"Stand"} onClick={handleStand} type={"small"} />
        </div>
    );
};

export default UserActions;
