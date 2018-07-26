<template>
        <div class="weather-list-container"
             v-bind:style="weather_list_style" v-if="weather_data">
            <v-btn flat class="hidden-md-and-up" @click="toggleWeatherList">
                <v-icon large> dehaze</v-icon>
            </v-btn>
            <v-list >
                <v-list-tile v-ripple
                             v-for="(item, i) in weather_data"
                             :key="i"
                             @click="selectItem(i)"
                             v-bind:class="{selected: selectedItem === i}"
                >
                    <v-list-tile-action>
                        <v-icon color="yellow">room</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>
                            <span>{{item.temp_max}}</span>
                            <span>{{' / ' + item.temp_min}}</span>
                        </v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.date }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </div>
</template>

<script>
    export default {
        name: "weather-list",
        data() {
            return {
                weatherDataObject: null,
                selectedItem: 0,
                open_weather_list: false,
                weather_list_style: {
                    right: '0px'
                },
            }
        },
        props: {
            weather_data: {
                type: Array,
                required: true,
            }
        },
        methods: {
            selectItem(i) {
                this.$emit('weather-item-selected', i);
                this.selectedItem = i;
            },
            toggleWeatherList() {
                this.open_weather_list = !this.open_weather_list;
                this.weather_list_style.right = this.open_weather_list ? '-300px' : '0px'
            }
        },
        computed: {}
    }
</script>

<style lang="scss" scoped>
    div.v-list {
        background-color: transparent; //rgba(26, 68, 89, 0.27);
        & > div {
            //border-radius: 15px;
            transition: background-color .3s;
            padding: 10px 0 !important;

        }
        div.v-list__tile__title {
            font-family: 'Montserrat';
            font-size: 1.5rem;
        }
    }

    .v-list__tile__action {
        i {
            width: 50px;
        }
    }

    .selected {
        transition: background-color .3s;
        background-color: rgba(105, 155, 252, 0.3) !important;;
    }

    .weather-list-container {
        width: 100%;
        button {
            position: absolute;
        }
    }

    .open-weather-list {
    }

    .list-enter-active, .list-leave-active {
        transition: opacity .5s;
        animation: list-slide-in 1s;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
    }

    @media only screen and (max-width: 959px) {
        .weather-list-container {
            border-radius: 15px;
            transition: right .3s, right .3s;
            width: 300px;
            position: fixed;
            top: 16px;
            background: rgba(32, 93, 159, 0.73);
            button {
                left: -60px;
            }
            .open-weather-list {
                //right: -300px !important;
            }
        }

    }
</style>