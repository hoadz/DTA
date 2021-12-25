<template>
  <v-main>
    <div class="title">Ứng dụng lịch</div>
    <router-view :key="$route.path" />
  </v-main>
</template>

<script>
export default {
  name: "DefaultView",
};
</script>
<style scoped lang="scss">
.title {
  color: #9e0c10;
  padding: 15px;
  font-size: 18px;
  font-weight: 600;
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(161 161 161 / 23%) 0px 2px 2px;
}
</style>