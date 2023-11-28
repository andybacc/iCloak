import { create } from 'zustand'
import apiClient from './services/apiClient'
import _ from 'lodash'

const initialState = {
    registro: [],
    date: [],
    inizialeG: localStorage.getItem('inizialeG') || 1,
    inizialeB: localStorage.getItem('inizialeB') || 1,
    printer: JSON.parse(localStorage.getItem('printer')) || '',
}

const useStore = create((set) => ({
    ...initialState,
    setDate: (payload) => set((state) => {
        return {
            ...state,
            date: payload,
        }
    }),
    setDataSel: (payload) => set((state) => {
        return {
            ...state,
            dataSel: payload,
        }
    }),
    setRegistro: (payload) => set((state) => {
        return {
            ...state,
            registro: payload,
        }
    }),
    delLastNumber: () => set((state) => {
        return {
            ...state,
            registro: _.drop(state.registro),
        }
    }),
    resetNumbers: (dataSel) => {
        apiClient.post(`/archive/` + dataSel)
        .then((r) => {
            alert('Reset numbers')
            set((state)=> ({...state, registro: []}))
        })
        .catch((e) => {
            console.log(e)
        })
    },
    archiveData: (dataSel) => {
        apiClient.post(`/archive/` + dataSel)
        .then((r) => {
            alert('Data archiviata')
            set((state)=> ({...state, registro: []}))
        })
        .catch((e) => {
            console.log(e)
        })
    },
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