<!--<template>
<!-- <v-app id="inspire"> -->
 <!-- <img
  src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm21-wood-jj-02_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=e158db7add72dd56a2ccfdb61100d2d2"
  id="bg"
  alt
  />  
<v-content>
<v-container  class="fill-height" fluid >
<v-row align="center" justify="center">
<v-col cols="12" sm="12" md="8">
<v-card class="elevation-12">
<v-window v-model="step">
  <v-window-item :value="1">
    <v-row >
      <v-col cols="12" md="8">
        <v-card-text class="mt-12">
          <h1
            class="text-center display-2 teal--text text--accent-3"
          >Sign in </h1>
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
          <v-form>
            <v-text-field
              label="Email"
              name="Email"
              prepend-icon="email"
              type="text"
              color="teal accent-3"
            />

            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="lock"
              type="password"
              color="teal accent-3"
            />
          </v-form>
          <h3 class="text-center mt-4">Forgot your password ?</h3>
        <div class="text-center mt-3">
          <v-btn rounded color="teal accent-3" dark  @click="signin()">SIGN IN</v-btn>
        </div>
        </v-card-text>
      </v-col>
      <v-col cols="12" md="4" class="teal accent-3">
        <v-card-text class="white--text mt-12">
          <h1 class="text-center display-1">Hello, Friend!</h1>
          <h5
            class="text-center"
          >Enter your personal details and start journay with us</h5>
        </v-card-text>
        <div class="text-center">
          <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-window-item>
  <v-window-item :value="2">
    <v-row class="fill-height">
      <v-col cols="12" md="4" class="teal accent-3">
        <v-card-text class="white--text mt-12">
          <h1 class="text-center display-1">Welcome Back!</h1>
          <h5
            class="text-center"
          >To Keep connected with us please login with your personnel info</h5>
        </v-card-text>
        <div class="text-center">
          <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
        </div>
      </v-col>

      <v-col cols="12" md="8">
        <v-card-text class="mt-12">
          <h1 class="text-center display-2 teal--text text--accent-3">Create Account</h1>
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

          <v-form  ref="form"
          v-model="valid"
          lazy-validation
            @submit.prevent="submit">
            <v-text-field
              label="Name"
              :rules="nameRules"
              name="Name"
              prepend-icon="person"
              type="text"
              color="teal accent-3"
            />
            <v-text-field
              label="Email"
              :rules="emailRules"
              name="Email"
              prepend-icon="email"
              type="text"
              color="teal accent-3"
            />

             <v-text-field
              label="Number"
              name="Number"
              prepend-icon="phone"
              type="text"
              color="teal accent-3"
              :rules="{
              required: true,
              digits: 8,
            }"
            />

            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="lock"
              type="password"
              color="teal accent-3"
              :rules="passwordRules"
              error-count="1"
              required
            />
          </v-form>
          <br>
        <div class="text-center mt-n5">
          <v-btn rounded color="teal accent-3" dark :disabled="invalid">SIGN UP</v-btn>
           <v-btn rounded color="teal accent-3" dark @click="reset">RESET</v-btn>
        </div>
        </v-card-text>
      </v-col>
    </v-row>
    </v-window-item>
    </v-window>
    </v-card>
            </v-col>
           </v-row>
        </v-container>
     </v-content>
  </v-app> 
</template>

<script>
import axios from "axios"
 const Cookie =require('js-cookie')
  export default {
  name :"Home",
  data: () => ({
  step: 1
  }),
  props: {
  source: String
  },
  methods : {
    reset () {
        this.$refs.form.reset()
      },
    async signin() {
      const user = {
                email: this.email,
                password: this.password
      }
     await axios.post('http://localhost:5000/api/users/Home', user)
        .then(res => {
          //if successfull
          if (res.status === 200) {
            Cookie.set('name',res.data.user.name)
            Cookie.set('email',res.data.user.email)
            Cookie.set('number',res.data.user.number)
            Cookie.set('status',res.data.user.status)
            localStorage.setItem('token', res.data.token);
            this.$router.push('/HelloWorld');
          }
        }, err => {
          console.log(err.response);
          this.error = err.response.data.error
        }) 
        document.location.reload(false)
    }
  }

  };
 </script>

  <style> 
  .fill-height {
  width: 1000px;
  }
   #bg {
  height:100%;
  width:100%;
  position:fixed;
  }
  </style>  