import { create } from 'zustand'
import apiClient from './services/apiClient'
import _ from 'lodash'

const initialState = {
    registro: [],
    date: [],
    range: null,
    printer: JSON.parse(localStorage.getItem('printer')) || '',
}

const useStore = create((set) => ({
    ...initialState,
    setRange: (payload) => set((state) => {
        localStorage.setItem('range', JSON.stringify(payload))
        return {
            ...state,
            range: payload,
        }
    }),
    getRange: () => {
        var localS = localStorage.getItem('range')
        var myRange = (localS && localS!=='undefined')? JSON.parse(localS) : {'G': {min: 1, max: 9999}, 'B': {min: 1, max: 9999}}
        console.log(myRange)
        set((state)=> ({...state, range: myRange}))
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