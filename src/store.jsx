import { create } from 'zustand'
import apiClient from './apiClient'
import _ from 'lodash'

const initialState = {
    registro: [],
    date: [],
    dataSel: null,
    isLogged: false,
    isAdmin: false,
    token: localStorage.getItem('iCloakToken') || null,
    postazione: 'iCloak1',
    settings: {
        venue: 'Molocinque',
        prezzi: {giacca: 3, borsa: 2},
        range: {'G': {min: 1, max: 9999}, 'B': {min: 1, max: 9999}},
        stampanti: {ricevuta: {nome: '', ip: '', lang: 'it', active: false}, fiscale: {nome: '', ip: '', active: false}}
    },
}

const useStore = create((set) => ({
    ...initialState,
    setAuth: (payload) => set(() => {
        console.log(payload)
        var newState = {
            isLogged: true,
            postazione: payload.postazione,
            isAdmin: (payload.postazione == 'iCloak1')? true : false,
            listino: payload.listino || [],
            date: payload.date || [],
            dataSel: payload.dataSel || null,
            settings: (payload.settings && payload.settings!=null)? payload.settings : initialState.settings,
        }
        
        if(payload.token) {
            newState.token = payload.token
            apiClient.defaults.headers.common['x-auth-token'] = payload.token;
            localStorage.setItem('iCloakToken', payload.token)
        }
        return newState
    }),
    saveSettings: (payload) => {
        return new Promise((resolve, reject) => {
            apiClient.post(`/settings`, {settings: payload})
            .then(function (r) {
                set({settings: payload})
                resolve(r.data)
            })
            .catch(function (e) {
                reject(e)
            })
        })
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
            registro: [],
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