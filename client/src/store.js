import Vue from 'vue'
import Vuex from 'vuex'

const CURRENT_LOCATION_MUTATION = 'CURRENT_LOCATION_MUTATION';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        current_location: ''
    },
    getters: {
        currentLocation: state => {
            return state.current_location;
        }
    },
    mutations: {
        [CURRENT_LOCATION_MUTATION](state, payload) {
            state.location = payload;
        }
    },
    actions: {}
})
