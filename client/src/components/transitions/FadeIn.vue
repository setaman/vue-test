<template>
    <transition name="fade-in">
        <slot></slot>
    </transition>
</template>

<script>
    export default {
        name: "FadeIn"
    }
</script>

<style scoped>
    .fade-in-enter-active, .slide-in-leave-active {
        transition: opacity .5s;
    }

    .fade-in-enter, .slide-in-leave-to {
        opacity: 0;
    }
</style>