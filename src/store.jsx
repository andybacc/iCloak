import { create } from 'zustand'

const initialState = {
    numeri: false,
    inizialeG: localStorage.getItem('inizialeG') || 1,
    inizialeB: localStorage.getItem('inizialeB') || 1,
    printer: JSON.parse(localStorage.getItem('printer')) || '',
}

const useStore = create((set) => ({
    ...initialState,
    setIniziale: (payload) => set((state) => {
        localStorage.setItem('inizialeG', payload.inizialeG)
        localStorage.setItem('inizialeB', payload.inizialeB)
        return {
            ...state,
            inizialeG: payload.inizialeG,
            inizialeB: payload.inizialeB,
        }
    }),
    setPrinter: (payload) => set((state) => {
        localStorage.setItem('printer', JSON.stringify(payload))
        return {
            ...state,
            printer: payload,
        }
    }),
}))
export default useStore