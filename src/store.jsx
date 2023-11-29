import { create } from 'zustand'
import apiClient from './services/apiClient'
import _ from 'lodash'

const initialState = {
    registro: [],
    date: [],
    iniziali: localStorage.getItem('iniziali')!=='undefined' ? JSON.parse(localStorage.getItem('iniziali')) : {'G': 1, 'B': 1},
    printer: JSON.parse(localStorage.getItem('printer')) || '',
}

const useStore = create((set) => ({
    ...initialState,
    getIniziali: () => {
        var tmp = localStorage.getItem('iniziali')!=='undefined' ? JSON.parse(localStorage.getItem('iniziali')) : {'G': 1, 'B': 1}
        set((state)=> ({...state, iniziali: tmp}))
    },
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
    resetNumbers: (dataSel) => set((state) => {
        return {
            ...state,
            registro: _.reject(state.registro, {data: dataSel}),
        }
    }),
    setIniziali: (payload) => set((state) => {
        localStorage.setItem('iniziali', JSON.stringify(payload))
        return {
            ...state,
            iniziali: payload,
        }
    }),
    setPrinter: (payload) => set((state) => {
        localStorage.setItem('printer', JSON.stringify(payload))
        return {
            ...state,
            printer: payload,
        }
    }),
    fetchDate: () => {
        apiClient.get(`/date/1`)
        .then((r) => {
            set((state)=> ({...state, date: r.data}))
        })
        .catch((e) => {
            console.log(e)
        })
    }
}))
export default useStore