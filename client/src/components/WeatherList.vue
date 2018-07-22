<template>

    <v-list>
        <v-list-tile
                v-for="(item, i) in weather_data"
                :key="i"
                @click="$emit('weather-item-selected', i)"
        >
            <v-list-tile-action>
                <v-icon color="yellow">room</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
                <v-list-tile-title>{{ item.temp + ' C°' }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.date }}</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>


</template>

<script>
    import EventBus from "vue";

    export default {
        name: "weather-list",
        data() {
            return {
                weatherDataObject: null
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
        }
    }
</script>

<style lang="scss" scoped>
    div.v-list {
        border-radius: 15px;
        background-color: rgba(26, 68, 89, 0.27);
        & > div {
            padding: 10px 0 !important;

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

</style>