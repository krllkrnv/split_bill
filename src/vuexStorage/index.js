import {createStore} from 'vuex'

export default createStore({
    state: {
        customers: [],
        dishes: [],
        total: 0,
    },
    getters: {
        CUSTOMERS: state => {
            return state.customers;
        },
        TOTAL: state => {
            return state.total;
        },
        DISHES: state => {
            return state.dishes;
        }
    },
    mutations: {
        SET_CUSTOMERS: (state, payload) => {
            state.customers = payload;
        },
        SET_DISHES: (state, payload) => {
            state.dishes = payload;
        },
        SET_TOTAL: (state, payload) => {
            state.total = payload;
        },
    },
})