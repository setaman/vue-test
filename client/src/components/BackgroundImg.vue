<template>
    <div id="weather-img" :class="{blur: !is_loading}"></div>
</template>

<script>
    export default {
        name: "BackgroundImg",
        props: {
            is_loading: {
              type: Boolean,
              default () {
                  return false;
              }
            },
            img_url: {
                type: String,
                default () {
                    return '../assets/img/weather_sunshine.jpg';
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
        background-image: url("../assets/img/weather_sunshine.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
        width: 100vw;
        filter: blur(0px) brightness(85%) opacity(100%) contrast(50%);
        &.blur {
             filter: blur(10px) brightness(50%) opacity(100%) contrast(50%);
         }
    }
</style>