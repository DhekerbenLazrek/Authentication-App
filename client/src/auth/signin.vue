<template>
   <v-app>
    
    <v-content>
      <v-card id="card" width="800" height="470" class="mx-auto mt-9">
        <v-card-title class="text-center display-3 teal" width="800">Login Form</v-card-title>
        <br>
   <form>
       
    <v-text-field
      v-model="email"
      
        label="Email"
        name="Email"
        prepend-icon="email"
        type="text"
        color="teal accent-3"
        required
           
      
    ></v-text-field>
    <v-text-field
        id="password"
        label="Password"
        v-model="password"
        prepend-icon="lock"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        error-count="1"
        required
        color="teal accent-3"
></v-text-field>
     <v-btn class="mr-4" @click="signin()">Submit</v-btn>
    <h3 class="text-center mt-4">Forgot your password ?</h3>
    {{ error }}
     <v-col cols="12" md="80" sm="12" >
       
          <div class="text-center mt-4">
            <v-btn class="mx-2" fab color="black" outlined>
              <v-icon>fab fa-facebook-f</v-icon>
            </v-btn>

            <v-btn class="mx-2" fab color="black" outlined>
              <v-icon>fab fa-google-plus-g</v-icon>
            </v-btn>
            <v-btn class="mx-2" fab color="black" outlined>
              <v-icon>fab fa-github-square</v-icon>
            </v-btn>
          </div>
          <h4 class="text-center mt-4">Ensure your email for registration</h4>

  </v-col>
  </form>
  </v-card>
  </v-content>
  </v-app>
</template>
<script>
  import axios from 'axios';
  const Cookie =require('js-cookie')
 export default {
    name: "Signin",
    data() {
    return {
      email: '',
      password: '',
      error: '',
      showPassword: false,
    }},
    methods:{
     async signin() {
      const user = {
                email: this.email,
                password: this.password
      }
     await axios.post('http://localhost:5000/api/users/signin', user)
        .then(res => {
          //if successfull
          if (res.status === 200) {
            Cookie.set('name',res.data.user.name)
            Cookie.set('email',res.data.user.email)
            Cookie.set('number',res.data.user.number)
            Cookie.set('status',res.data.user.status)
            localStorage.setItem('token', res.data.token);
            this.$router.push('/home');
          }
        }, err => {
          console.log(err.response);
          this.error = err.response.data.error
        }) 
        document.location.reload(false)
  }
    }
 }
</script>

<style> 

#bg {
height:100%;
width:100%;
position:fixed;
}
</style> 