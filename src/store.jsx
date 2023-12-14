import { create } from 'zustand'
import apiClient from './apiClient'
import _ from 'lodash'

const initialState = {
    registro: [],
    date: [],
    range: null,
    isLogged: false,
    token: localStorage.tokenIcloak || null,
    postazione: localStorage.getItem('postazione') || 'Cloak1',
    prezzi: JSON.parse(localStorage.getItem('prezzi')) || {giacca: 3, borsa: 2},
    stampanti: JSON.parse(localStorage.getItem('stampanti')) || {ricevuta: {nome: '', ip: '', lang: 'it', active: false}, fiscale: {nome: '', ip: '', active: false}},
}

const useStore = create((set) => ({
    ...initialState,
    setAuth: (payload) => set(() => {
        var newState = {
            isLogged: true,
            postazione: payload.postazione,
            session: { isAdmin: (payload.isAdmin) ? true : false },
            listino: payload.listino || [],
            date: payload.date || [],
            dataSel: payload.dataSel || null,
            stampanti: payload.stampanti || {ricevuta: {nome: '', ip: '', active: false}, fiscale: {nome: '', ip: '', active: false}},
        }
        
        if(payload.token) {
            newState.tokenIdrink = payload.token
            apiClient.defaults.headers.common['x-auth-token'] = payload.token;
            localStorage.setItem('tokenIdrink', payload.token)
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
        localStorage.setItem('stampanti', JSON.stringify(payload))
        return {
            ...state,
            stampanti: payload,
        }
    }),
    fetchDate: () => {
        return new Promise((resolve, reject) => {
                apiClient.get(`/date/1`)
                .then((r) => {
                    console.log(r.data)
                    set((state)=> ({...state, date: r.data}))
                    resolve()
                })
                .catch((e) => {
                    console.log(e.message)
                    reject(e)
                })
        })
    },
    setServer: (payload) => set((state) => {
        localStorage.setItem('server', payload)
        return {
            ...state,
            server: payload,
        }
    }),
}))
export default useStore