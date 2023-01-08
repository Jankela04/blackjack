import create from "zustand";

type ChipsState = {
    chips: number;
    bet: number;
    addChips: () => void;
    placeBet: (amount: number) => void;
    wonBet: () => void;
    draw: () => void;
};

const useChips = create<ChipsState>((set) => ({
    chips: 200,
    bet: 0,
    addChips: () => set((state) => ({ chips: state.chips + 50 })),
    placeBet: (amount: number) =>
        set((state) => ({ chips: state.chips - amount, bet: amount })),
    wonBet: () =>
        set((state) => ({ chips: state.chips + state.bet * 2, bet: 0 })),
    draw: () => {
        set((state) => ({ chips: state.chips + state.bet, bet: 0 }));
    },
}));

export default useChips;
