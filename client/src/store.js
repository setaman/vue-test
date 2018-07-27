import Vue from 'vue'
import Vuex from 'vuex'
//import cities from './assets/city.list.min';

const CURRENT_LOCATION_MUTATION = 'CURRENT_LOCATION_MUTATION';
const SET_WEATHER_DATA = 'SET_WEATHER_DATA';
const WEATHER_DATA_LOADED = 'WEATHER_DATA_LOADED';
const WEATHER_DATA_LOADING = 'WEATHER_DATA_LOADING';
const CHANGE_CURRENT_CONDITION = 'CHANGE_CURRENT_CONDITION';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cities: [/*...cities*/],
        current_location: '',
        weather_data: [],
        is_weather_data_loaded: false,
        current_condition: 0
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
        },
        weatherDataLoaded : sate => {
            return sate.is_weather_data_loaded;
        },
        getCurrentCondition : sate => {
            return sate.current_condition;
        }
    },
    mutations: {
        [CURRENT_LOCATION_MUTATION](state, payload) {
            state.location = payload;
        },
        [SET_WEATHER_DATA](state, payload) {
            state.weather_data = payload;
        },
        [WEATHER_DATA_LOADED](state) {
            state.is_weather_data_loaded = true;
        },
        [WEATHER_DATA_LOADING](state) {
            state.is_weather_data_loaded = false;
        },
        [CHANGE_CURRENT_CONDITION](state, condition) {
            state.current_condition = condition;
        }
    },
    actions: {}
})
