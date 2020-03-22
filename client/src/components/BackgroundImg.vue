<template>
    <div id="weather-img" :class="[{blur: !is_loading}, backgImgClass]"></div>
</template>

<script>
    /*let condition_clear = '../assets/img/conditions/clear.jpg',
        condition_few_clouds = '../assets/img/conditions/few_clouds.jpg',
        condition_clouds = '../assets/img/conditions/clouds.jpg',
        condition_broken_clouds = '../assets/img/conditions/broken_clouds.jpg',
        condition_snow = '../assets/img/conditions/snow.jpg',
        condition_rain = '../assets/img/conditions/rain.jpg',
        condition_drizzle = '../assets/img/conditions/drizzle.jpg',
        condition_thunderstorm = '../assets/img/conditions/thunderstorm.jpg';*/


    export default {
        name: "BackgroundImg",
        props: {
            is_loading: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            img_id: {
                type: Number,
                default() {
                    return 0;
                }
            }
        },
        computed: {
            backgImgClass() {
                switch (this.$store.getters.getCurrentCondition) {
                    case 0:
                        return 'clear';
                    case 1:
                        return 'few_clouds';
                    case 2:
                        return 'clouds';
                    case 3:
                        return 'broken_clouds';
                    case 4:
                        return 'snow';
                    case 5:
                        return 'rain';
                    case 6:
                        return 'drizzle';
                    case 7:
                        return 'thunderstorm';
                };
            }
        },
    }
</script>

<style lang="scss" scoped>
    #weather-img {
        transition: all .5s;
        z-index: 0;
        position: fixed;
        top: 0;
        left: 0;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
        width: 100vw;
        filter: blur(0px) brightness(85%) opacity(100%) contrast(50%);
        &.blur {
            filter: blur(10px) brightness(50%) opacity(100%) contrast(50%);
        }
        &.clear {
            background-image: url("../assets/img/conditions/clear.jpg");
        }
        &.few_clouds {
            background-image: url("../assets/img/conditions/few_clouds.jpg");
        }
        &.clouds {
            background-image: url("../assets/img/conditions/clouds.jpg");
        }
        &.broken_clouds {
            background-image: url("../assets/img/conditions/broken_clouds.jpg");
        }
        &.snow {
            background-image: url("../assets/img/conditions/snow.jpg");
        }
        &.rain {
            background-image: url("../assets/img/conditions/rain.jpg");
        }
        &.drizzle {
            background-image: url("../assets/img/conditions/drizzle.jpg");
        }
        &.thunderstorm {
            background-image: url("../assets/img/conditions/thunderstorm.jpg");
        }
    }
</style>