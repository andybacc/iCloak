import { create } from 'zustand'

const initialState = {
    numeri: false,
}

const useStore = create((set) => ({
    ...initialState,
    setNumeri: (payload) => set((state) => {

    }),
}))
export default useStore