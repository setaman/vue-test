import Vue from 'vue'
import Vuex from 'vuex'
//import cities from './assets/city.list.min';

const CURRENT_LOCATION_MUTATION = 'CURRENT_LOCATION_MUTATION';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cities: [/*...cities*/],
        current_location: ''
    },
    getters: {
        currentLocation: state => {
            return state.current_location;
        },
        cities: state => {
            return state.cities;

        }
    },
    mutations: {
        [CURRENT_LOCATION_MUTATION](state, payload) {
            state.location = payload;
        }
    },
    actions: {}
})
