<template>
    <div id="d">

        <div id="login">
            <form action="">
                <img src="img/ar.jpg"><br>
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
        align-items: center;
        background: url("../../public/back.png") no-repeat;
        background-size: cover;

        .login-form {
            background: rgba(238, 238, 238, 0.51);
            z-index: 100;
            width: 100%;
            .card-head{
                display: flex;
                justify-content: left;
            }
        }
    }

    #d{
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        background: url("../../public/back.png") no-repeat;
        background-size: cover;

    }

    #login{
        width: 350px;
        height: 500px;
        background: inherit;
        position: absolute;
        overflow: hidden;
        top: 50%;
        left: 50%;
        margin-left: -175px;
        margin-top: -250px;
        border-radius: 8px;
    }
    #login:before{
        width: 400px;
        height: 550px;
        content: "";
        position: absolute;
        top: -25px;
        left: -25px;
        bottom: 0;
        right: 0;
        filter: blur(10px);
        background: inherit;
        box-shadow: inset 0 0 0 200px rgba(255,255,255,0.2);
    }

</style>
