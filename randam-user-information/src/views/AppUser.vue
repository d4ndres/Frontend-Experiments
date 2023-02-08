<template>
  <section class="user">

    <template v-if="user">
      
      <h2 class="user__name">{{ userData.fullName }}</h2>
      <img
        :src="userData.thumbnail"
        :ismap="userData.fullName"
        class="user__picture"
      />
      <p>
        {{ userData.email }}
      </p>
      <RouterLink 
        class="user__more" 
        :to="{
          name: `Info`,
          params: { username: this.user.login.username }}"
    
        >Show user info</RouterLink>
      <RouterView />
      <a @click.prevent="loadPrevUser" href="#">👈 Prev user</a>|
      <a @click.prevent="loadNextUser" href="#"> Next user 👉</a>
    </template>

  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "AppUser",
  methods:{
    loadPrevUser() {
      this.$router.push({
        name: 'User',
        params: { username: this.prevUser.login.username }
      })
    },
    loadNextUser() {
      this.$router.push({
        name: 'User',
        params: { username: this.nextUser.login.username }
      })
    },
  },

  computed: {
    ...mapState(['users']),
    user(){
      return this.users.find( user => user.login.username == this.$route.params.username )
    },  
    userIndex(){
      return this.users.findIndex( user => user.login.username == this.$route.params.username )
    },
    userData() {
      return {
            fullName: `${this.user.name.first} ${this.user.name.last}`,
            thumbnail: this.user.picture.large,
            email: this.user.email
          }
    },
    prevUser(){
      let index = this.userIndex < 0 ? this.users.length : this.userIndex 
      return this.users[index- 1]
    },
    nextUser(){
      let index = this.userIndex >= this.users.length - 1 ? -1 : this.userIndex 
      return this.users[index + 1]
    }

  }
};
</script>

<style scoped>
.user {
  padding: 2rem 0.5rem;
  text-align: center;
}

.user__picture {
  border: 1px solid;
}
.user__more {
  display: block;
  margin-top: 1rem;
  color: #000;
}
a {
  color:crimson;
  padding: 10px;
  text-decoration: none;
}


</style>
