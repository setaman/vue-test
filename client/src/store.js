import Vue from 'vue'
import Vuex from 'vuex'
//import cities from './assets/city.list.min';

const CURRENT_LOCATION_MUTATION = 'CURRENT_LOCATION_MUTATION';
const SET_WEATHER_DATA = 'SET_WEATHER_DATA';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cities: [/*...cities*/],
        current_location: '',
        weather_data: [],
    },
    getters: {
        currentLocation: state => {
            return state.current_location;
        },
        cities: state => {
            return state.cities;

        },
        getWeather: state => {
            return state.weather_data;

        }
    },
    mutations: {
        [CURRENT_LOCATION_MUTATION](state, payload) {
            state.location = payload;
        },
        [SET_WEATHER_DATA](state, payload) {
            state.weather_data = payload;
        }
    },
    actions: {}
})
