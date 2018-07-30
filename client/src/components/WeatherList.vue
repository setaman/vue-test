<template>
        <div class="weather-list-container d-flex align-center justify-center"
             v-bind:style="weather_list_style" v-if="weather_data">
            <v-btn flat class="hidden-md-and-up" @click="open_weather_list = !open_weather_list">
                <v-icon large color="white"> dehaze</v-icon>
            </v-btn>
            <v-list :class="{'open-weather-list': open_weather_list}">
                <v-list-tile v-ripple
                             v-for="(item, i) in weather_data"
                             :key="i"
                             @click="selectItem(i)"
                             v-bind:class="{selected: selectedItem === i, 'open-weather-list': open_weather_list}"
                             class="text-sm-center">
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
            position: relative;
            width: 100%;
            margin: 0;
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
            height: 36px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            align-items: center;
            transition: .3s;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            button {
            }
            &.open-weather-list {
                height: auto;
            }
            .v-list {
                transition: .3s;
                transform-origin: top center;
                transform: scaleY(0);
                background: rgba(0, 0, 0, 0.5);
                &.open-weather-list {
                    transform: scaleY(1);
                }
            }
        }

    }

</style>