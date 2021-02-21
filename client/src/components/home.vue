<template>
  <v-app>
<v-container class="app">
      <v-card flat>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>Registration successful!</span>
      <v-icon dark>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-snackbar>
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="form.first"
              :rules="rules.name"
              color="purple darken-2"
              label="First name"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="form.last"
              :rules="rules.name"
              color="blue darken-2"
              label="Last name"
              required
            ></v-text-field>
          </v-col>

            <v-col
            cols="12"
            sm="6"
          >
             <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          ></v-text-field>
          </v-col>

         <v-col
            cols="12"
            sm="6"
          >
             <v-text-field
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                v-model="password"
                :rules="passwordRules"
                error-count="1"
                required
              ></v-text-field>
             </v-col>
         
         
          <v-col cols="12">
            <v-textarea
              v-model="form.bio"
              color="teal"
            >
              <template v-slot:label>
                <div>
                  Bio <small>(optional)</small>
                </div>
              </template>
            </v-textarea>
          </v-col>
          <v-file-input
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
        label="Choose a Picture"
  ></v-file-input>
          
          
        </v-row>
      </v-container>
      <v-card-actions>
          <v-btn color="blue" @click="resetForm">
         Edit
        </v-btn>
        <v-btn  color="red" @click="resetForm">
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        
      </v-card-actions>
    </v-form>
      </v-card>
   </v-container>
  </v-app>
</template>

<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {extend,setInteractionMode,} from "vee-validate";
setInteractionMode("eager");
extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});
extend("email", {
  ...email,
  message: "Email must be valid",
});
export default {
  name: "home",
  components: {
     
   
  },
   data () {
       
      const defaultForm = Object.freeze({
        first: '',
        last: '',
        Email:'',
        Password:'',
        bio: '',
        picture:'',
        terms: false,
      })

      return {
        email: "",
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: "",
      passwordRules: [
        ($v) => !!$v || "Password is required",
        ($v) => ($v && $v.length >= 8) || "Password must have 8+ characters",
        ($v) => /(?=.*[A-Z])/.test($v) || "Must have one uppercase character",
        ($v) => /(?=.*\d)/.test($v) || "Must have one number",
        ($v) =>
          /([!@$%])/.test($v) || "Must have one special character [!@#$%]",
      ],
      showPassword: false,
      error: "",
    
        form: Object.assign({}, defaultForm),
        rules: {
          name: [val => (val || '').length > 0 || 'This field is required'],
        },

        conditions: false,
        snackbar: false,
        terms: false,
        defaultForm,
      }
      
    },

    computed: {
      formIsValid () {
        return (
          this.form.first &&
          this.form.last &&
          this.form.Email &&
          this.form.terms
        )
      },
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.snackbar = true
        this.resetForm()
      },
    },
   
  
   
    
    
  
};
</script>


<style> 

h3{
  color :rgb(3, 3, 3)
}
</style> 