<template>
    <div id="weather-img" :class="[{blur: !is_loading}, backgImgClass]"></div>
</template>

<script>

    /* // weather backgrounds
     var clearSky        = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504020580/WWWeather/clearsky.png",
         fewClouds       = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504018658/WWWeather/fewclouds.jpg",
         scatteredClouds = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504015796/WWWeather/scattered-clouds.png",
         brokenClouds    = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504018658/WWWeather/brokenclouds.jpg",
         drizzle         = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504018659/WWWeather/drizzle.png",
         rain            = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504018658/WWWeather/rain.jpg",
         thunderStorm    = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504018659/WWWeather/thunderstorm.jpg",
         snow            = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504018659/WWWeather/snow.jpg",
         mist            = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504018660/WWWeather/mist.jpg";
     // weather SVGs
     var sun             = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504119685/WWWeather/SVGs/Sun.svg",
         cloudSun        = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504119681/WWWeather/SVGs/Cloud-Sun.svg",
         cloud           = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504119681/WWWeather/SVGs/Cloud.svg",
         cloudDrizzle    = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504119681/WWWeather/SVGs/Cloud-Drizzle.svg",
         cloudRain       = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504119681/WWWeather/SVGs/Cloud-Rain.svg",
         cloudLightning  = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504119681/WWWeather/SVGs/Cloud-Lightning.svg",
         cloudFog        = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504119681/WWWeather/SVGs/Cloud-Fog.svg",
         cloudWind       = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504119685/WWWeather/SVGs/Cloud-Wind.svg",
         snowflake       = "http://res.cloudinary.com/detqxj5bf/image/upload/v1504119684/WWWeather/SVGs/Snowflake.svg";*/

    let condition_clear = '../assets/img/conditions/clear.jpg',
        condition_few_clouds = '../assets/img/conditions/few_clouds.jpg',
        condition_clouds = '../assets/img/conditions/clouds.jpg',
        condition_broken_clouds = '../assets/img/conditions/broken_clouds.jpg',
        condition_snow = '../assets/img/conditions/snow.jpg',
        condition_rain = '../assets/img/conditions/rain.jpg',
        condition_drizzle = '../assets/img/conditions/drizzle.jpg',
        condition_thunderstorm = '../assets/img/conditions/thunderstorm.jpg';


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
                switch (this.img_id) {
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
        methods: {
            setBackgImg(id) {
                console.warn(id);
                switch (id) {
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
                        return 'drizzle';
                    case 6:
                        return condition_drizzle;
                    case 7:
                        return condition_thunderstorm;
                }
            }
        }
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
            background-image: url("../assets/img/conditions/clear.png");
        }
        &.few_clouds {
            background-image: url("../assets/img/conditions/few_clouds.jpg");
        }
        &.clouds {
            background-image: url("../assets/img/conditions/clear.png");
        }
        &.broken_clouds {
            background-image: url("../assets/img/conditions/clear.png");
        }
        &.snow {
            background-image: url("../assets/img/conditions/clear.png");
        }
        &.rain {
            background-image: url("../assets/img/conditions/clear.png");
        }
        &.drizzle {
            background-image: url("../assets/img/conditions/clear.png");
        }
        &.thunderstorm {
            background-image: url("../assets/img/conditions/clear.png");
        }
    }
</style>