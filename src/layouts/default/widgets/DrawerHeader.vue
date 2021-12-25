<template>
  <v-list-item class="mb-0 justify-space-between pl-3" style="height: 123px">
    <!-- <v-list-item-avatar>
      <v-img
        :src="
          require('@/assets/favicon2.svg')"
      />
     
    </v-list-item-avatar> -->
    <!-- <img src="" alt=""> -->
    <v-img
      width="100"
      height="50"
      style="height: 85px;padding-top: 7px;width: 100px;"
      :src="require('@/assets/favicon2.svg')"
    />
    <!-- <div style="    background-image: url(http://localhost:8080/img/favicon2.b9cd1c6e.svg);"></div> -->
  </v-list-item>
</template>

<script>
// Utilities
import { get } from "vuex-pathify";

export default {
  name: "DefaultDrawerHeader",

  computed: { version: get("app/version") },
};
</script>
<style lang="scss">
 .v-image__image.v-image__image--cover{
    background-size: contain;
 } 
</style>