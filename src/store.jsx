import { create } from 'zustand'
import apiClient from './apiClient'
import _ from 'lodash'

const initialState = {
    registro: [],
    date: [],
    dataSel: null,
    range: null,
    isLogged: false,
    isAdmin: false,
    token: localStorage.getItem('iCloakToken') || null,
    postazione: 'Cloak1',
    prezzi: JSON.parse(localStorage.getItem('iCloakPrezzi')) || {giacca: 3, borsa: 2},
    stampanti: JSON.parse(localStorage.getItem('iCloakStampanti')) || {ricevuta: {nome: '', ip: '', lang: 'it', active: false}, fiscale: {nome: '', ip: '', active: false}},
}

const useStore = create((set) => ({
    ...initialState,
    setAuth: (payload) => set(() => {
        var newState = {
            isLogged: true,
            postazione: payload.postazione,
            isAdmin: (payload.postazione == 'iCloak1')? true : false,
            listino: payload.listino || [],
            date: payload.date || [],
            dataSel: payload.dataSel || null,
        }
        
        if(payload.token) {
            newState.token = payload.token
            apiClient.defaults.headers.common['x-auth-token'] = payload.token;
            localStorage.setItem('iCloakToken', payload.token)
        }
        return newState
    }),
    setPrezzi: (payload) => set((state) => {
        localStorage.setItem('prezzi', JSON.stringify(payload))
        return {
            ...state,
            prezzi: payload,
        }
    }),
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
    resetNumbers: () => set((state) => {
        return {
            ...state,
            registro: _.reject(state.registro, {data: state.dataSel}),
        }
    }),
    setStampanti: (payload) => set((state) => {
        localStorage.setItem('iCloakStampanti', JSON.stringify(payload))
        return {
            ...state,
            stampanti: payload,
        }
    }),
    setServer: (payload) => set((state) => {
        localStorage.setItem('server', payload)
        return {
            ...state,
            server: payload,
        }
    }),
    Logout: () => set(() => {
        localStorage.removeItem('iCloakToken')        
        return initialState
    }),
}))
export default useStore