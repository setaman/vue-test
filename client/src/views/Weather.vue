<template>
    <v-container id="weather-container" fluid align-center justify-center fill-height>
        <v-layout id="weather-content" row align-center justify-center>
            <v-flex sm12 md6 lg6 xl6>
                <v-expansion-panel focusable class="elevation-10">
                    <v-expansion-panel-content v-for="(item,i) in items" :key="i">
                        <div slot="header">{{item.text}} from {{i}}</div>
                        <v-card>
                            <v-card-text class="lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
        <div id="weather-img" class="fill-height"></div>
    </v-container>
</template>

<script>
    export default {
        name: "Weather",
        data() {
            return {
                items: [
                    {
                    text: 'hello',
                    id: 0
                    },
                    {
                        text: 'hey',
                        id: 1
                    }, {
                        text: 'hui',
                        id: 2
                    }, {
                        text: 'hep',
                        id: 3
                    },
                    {
                        text: 'foo',
                        id: 4
                    },
                    {
                        text: 'foo',
                        id: 5
                    },
                    {
                        text: 'foo',
                        id: 6
                    }]
            }
        }
    }
</script>

<style lang="scss" scoped>
    #weather-container {
        #weather-content{
            z-index: 1;
        }
        #weather-img {
            position: fixed;
            background: url("../assets/img/weather_sunshine.jpg") no-repeat;
            background-size: cover;
            height: 100%;
            width: 100%;
            filter: blur(0px) brightness(85%) opacity(100%) contrast(50%);
        }
    }

</style>