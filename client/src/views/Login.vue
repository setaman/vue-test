<template>
    <div class="login-form-container">

        <div class="login">
            <form action="">
                <input type="text" value="arinas" placeholder="Benutzername"><br>
                <input type="password" placeholder="Passwort"><br>
                <input type="submit" value="Einloggen"><br>
                <span><a href="#">Passwort vergessen?</a></span>
            </form>
        </div>

    </div>
</template>

<script>
    export default {
        components: {},
        name: 'login',
        data: () => ({
            gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)'
        })
    }
</script>
<style lang="scss" scoped>
    .login-form-container {
        /*padding: 20% 35%;*/
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
       margin: auto;
        top: 0;
        left: 0;
        background: red no-repeat;
        background-size: cover;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: center;
    }

    .login{

        overflow: hidden;
        top: 50%;
        left: 50%;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.25);
    }
    .login:before{
        content: "";
        bottom: 0;
        right: 0;
        filter: blur(10px);
        box-shadow: inset 0 0 0 200px rgba(255,255,255,0.2);
    }

</style>
