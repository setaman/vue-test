<template>
    <transition mode="out-in" name="slide-in-out">
        <slot></slot>
    </transition>

</template>

<script>
    export default {
        name: "SlideInOut"
    }
</script>

<style lang="scss">
    .slide-in-out-enter-active {
        animation: enter .5s linear;
    }
    .slide-in-out-leave-active {
        animation: leave .5s linear;
    }

    @keyframes enter {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }

    }
    @keyframes leave {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0);
        }

    }
</style>