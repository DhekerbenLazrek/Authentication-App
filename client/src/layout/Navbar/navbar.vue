<template >
  <v-sheet  width="100%">
    <v-tabs id="tabs"  width="100%" height="64px"
      dark color="cyan"
      show-arrows
    >
      <v-tabs-slider color="cyan"></v-tabs-slider>
      <v-tab>
      <v-btn class="ma-9" outlined color="white" router-link to="/profile">
       Profile <v-icon>fas fa-user</v-icon></v-btn> 
      </v-tab>
      <v-tab>
       <v-btn class="ma-2" outlined color="light-green lighten-5" router-link to="/signin">
     Sign In
    </v-btn>
    </v-tab>
      <v-tab>
       <v-btn class="ma-2" outlined color="light-green lighten-5" router-link to="/signup">
     Sign Up
    </v-btn>
    </v-tab>
    <div class="navdiv" v-if="!this.islogged" >
      <span class="name_loggedin" > </span>
      </div>
      <div class="navdiv2" v-else-if='this.islogged'>
      <span class="name_loggedin"><v-icon>{{ icons.mdiAccount }}</v-icon>{{this.username}}</span>
      <v-btn @click="logout()" class="ma-2" id="logout" color="red" >logout</v-btn>
      </div>

     <div class="navdiv" v-if="!this.islog" >
      </div>
      <div class="navdiv2" v-else-if='this.islog'>
     <v-btn class="ma-9" id="profile" outlined color="white" router-link to="/profile">
       Profile <v-icon>fas fa-user</v-icon></v-btn>
      </div>
   
      
</v-tabs>
  </v-sheet>
</template>
 <script>
const Cookie =require('js-cookie');
import {mdiAccount} from '@mdi/js';
export default {
  name: "navbar",
  data: () => ({
    islogged:!!Cookie.get('name'),
    username:Cookie.get('name'),
    icons: {
        mdiAccount}
  }),
  updated(){
    if(Cookie.get('name')){
      this.islogged= true;
    }
  },
  methods:{
    logout(){
      this.islogged = false;
      Cookie.remove('name')
      this.$router.push('/signin')
    }
  }
};
</script>
<style scoped>
.navdiv{
 display:flex;
 justify-content:space-between;
 padding:0 5%
}
.name_loggedin{
  justify-self:center;
  align-self: center;
  
}
.mainHeader{
  display:flex;
  justify-content:space-between
}
.navdiv2{
 display:flex;
 justify-content:space-between;
}
.navbar_space{
  margin-left:10rem;
}
.navbar_space2{
   margin-left:5rem;
}
#buttons {
  top:5px;
}
#logout{
  left:600px;
}

h3 {
  color :white;
}
</style>