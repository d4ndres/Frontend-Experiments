<template>
    <div>
        <h2>Login from</h2>
        <form @submit.prevent="onSubmit" id="form">
            <input v-model="username" required type="text" placeholder="Username">
            <input type="password" v-model="password" required placeholder="Password">
            <input type="submit" value="Login">
        </form>
    </div>
</template>


<script>

export default{
    name: 'AppLogin',
    data() {
        return{
            username: '',
            password: ''
        }
    },
    methods: {
        async onSubmit() {
            try{

                await this.$store.dispatch('doLogin', this.username)
                this.$router.push({ name: "Dashboard"})
                
            } catch ( error ){
                console.error(error)
            }
        }
    }
}


</script>


<style>



</style>