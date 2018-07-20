<template>
    <aside class="second-nav d-flex align-center">
        <ul>
            <li v-for="item in navItems">
                <div class="second-nav-item">
                    <v-btn tag="li" dark :to="item.route" small fab color="blue">
                        <v-icon>{{item.icon}}</v-icon>
                    </v-btn>
                    <span>{{item.text}}</span>
                </div>
            </li>
        </ul>

    </aside>
</template>

<script>
    export default {
        name: "second-nav",
        data() {
            return {}
        },
        props: {
            navItems: {
                type: Array,
                //required: true,
                default: () => {
                    return [
                        {
                            text: 'search',
                            route: '/',
                            icon: 'dashboard'
                        },
                        {
                            text: 'new asset',
                            route: '/add',
                            icon: 'star'
                        },
                        {
                            text: 'new asset',
                            route: '/add',
                            icon: 'filter'
                        },
                        {
                            text: 'new asset',
                            route: '/add',
                            icon: 'wb_sunny'
                        },
                        {
                            text: 'new asset',
                            route: '/add',
                            icon: 'home'
                        }
                    ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    aside.second-nav {
        transition: all .3s;
        height: 100%;
        width: auto;
        position: fixed;
        ul {
        }
        .second-nav-item {
            transition: inherit;
            display: inline-block;
            border-radius: 30px;
            cursor: pointer;
            width: auto;
            &:hover {
                width: 200px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
                background-color: rgb(105, 155, 252);
                span {
                    display: initial;
                    opacity: 1;
                }
            }
        }
        li {
            border-radius: 30px;
            transition: all .3s;
            list-style: none;
            text-transform: uppercase;
            width: auto;
            margin: 15px 0 5px -10px;
        }
        span {
            display: none;
            color: white;
            transition: inherit;
            font-size: 1.2rem;
            opacity: 0;
            margin: 0 15px 0 10px;
            font-weight: bold;
        }
        i.material-icons {
            display: flex !important;
        }
        a {
            display: inline-block;
            background: $background_gradient_inactive;
            max-width: 40px ;
            max-height: 40px ;
        }
    }

    a.v-btn--active {
        transform: scale(1.2);
        background: $background_gradient_primary !important;
    }

</style>