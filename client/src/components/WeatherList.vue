<template>

    <v-list>
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


</template>

<script>
    export default {
        name: "weather-list",
        data() {
            return {
                weatherDataObject: null,
                selectedItem: 0
            }
        },
        props: {
            weather_data: {
                type: Array,
                required: true,
                default() {
                    return {
                        temperature: 0,
                        location: 'Aachen',
                        hours_temp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        icon: 'wb_sunny'
                    }
                }
            }
        },
        methods: {
            selectItem (i) {
                this.$emit('weather-item-selected', i);
                this.selectedItem = i;
            }
        }
    }
</script>

<style lang="scss" scoped>
    div.v-list {
        background-color: transparent;//rgba(26, 68, 89, 0.27);

        * {
            background-color: transparent !important;
        }
        & > div {
            //border-radius: 15px;
            transition: background-color .3s;
            padding: 10px 0 !important;
            &:hover {
                background-color: rgba(105, 155, 252, 0.3) !important;;
            }

        }
        div.v-list__tile__title  {
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
        background-color: rgba(105, 155, 252, 0.3) !important;;
    }

</style>