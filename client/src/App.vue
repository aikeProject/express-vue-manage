<template>
    <div id="app" style="min-width: 960px;">
        <router-view/>
    </div>
</template>
<script>
    import jwt_decode from 'jwt-decode';
    import CY from './utils/CY'

    export default {
        name: 'App',
        created() {
            if (localStorage.getItem('eleToken')) {
                const eleToken = jwt_decode(localStorage.getItem('eleToken'));
                this.$store.dispatch('setIsAutnenticated', !CY.isEmpty(eleToken));
                this.$store.dispatch('setUser', eleToken);
            }
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }

    #app {
        width: 100%;
        height: 100%;
    }
</style>
