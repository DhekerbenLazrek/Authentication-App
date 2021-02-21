<template>
  <v-app>

    <v-app-bar max-height="65">
      <navbar />
    </v-app-bar>
    <div class="app"></div>
    <router-view></router-view>

    
  </v-app>
</template>

<script>
import Navbar from "./layout/Navbar/navbar";


export default {
  data() {
    return {};
  },
  components: {
    Navbar: Navbar,
    
  },
};
</script>

<style>
.v-toolbar__content, .v-toolbar__content {
  padding: 0 !important;
}
#bg {
  position: fixed;
  top: 0;
  left: 0;


}
.navbar {
  font-size: 100px;
}
</style>
