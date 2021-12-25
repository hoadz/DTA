<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
// Styles
import "@/styles/overrides.sass";
import "@/styles/custom-luna.scss";
export default {
  name: "App",
  metaInfo: {
    title: "App",
    titleTemplate: "%s | Material Dashboard Free",
    htmlAttrs: { lang: "en" },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
};
</script>
<style lang="scss">
.color-text {
  color: #9e0c10;
}
.my-8 {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
.col,
.col-1,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-10,
.col-11,
.col-12,
.col-auto,
.col-lg,
.col-lg-1,
.col-lg-2,
.col-lg-3,
.col-lg-4,
.col-lg-5,
.col-lg-6,
.col-lg-7,
.col-lg-8,
.col-lg-9,
.col-lg-10,
.col-lg-11,
.col-lg-12,
.col-lg-auto,
.col-md,
.col-md-1,
.col-md-2,
.col-md-3,
.col-md-4,
.col-md-5,
.col-md-6,
.col-md-7,
.col-md-8,
.col-md-9,
.col-md-10,
.col-md-11,
.col-md-12,
.col-md-auto,
.col-sm,
.col-sm-1,
.col-sm-2,
.col-sm-3,
.col-sm-4,
.col-sm-5,
.col-sm-6,
.col-sm-7,
.col-sm-8,
.col-sm-9,
.col-sm-10,
.col-sm-11,
.col-sm-12,
.col-sm-auto,
.col-xl,
.col-xl-1,
.col-xl-2,
.col-xl-3,
.col-xl-4,
.col-xl-5,
.col-xl-6,
.col-xl-7,
.col-xl-8,
.col-xl-9,
.col-xl-10,
.col-xl-11,
.col-xl-12,
.col-xl-auto {
  padding: 0;
}
.d-flex {
  display: flex;
}
.font-16 {
  font-size: 16px;
}
.font-13 {
  font-size: 13px;
}
.font-18 {
  font-size: 18px;
}
.font-20 {
  font-size: 20px;
}
.flex-col {
  display: flex;
  flex-flow: column;
}
.flex-1 {
  flex: 1;
}
.btn-save {
  padding: 7px 29px;
  background-color: #9e0c10;
  color: #fff !important;
  font-size: 13px;
  border-radius: 5px;
}

.text-area-right {
  width: 100%;
  border: thin solid #ced3d8;
  height: 100%;
  border-radius: 13px;
  padding: 10px;
}
.font-14 {
  font-size: 14px;
}
.text-input {
      padding: 5px 10px;
    font-size: 13px;
}
.button-noti {
  padding: 9px 24px;

  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
}
.backgroud-button {
  background: #9e0c10;
}
.text-h5 {
  border-bottom: thin solid #d9d9d9;
  margin-bottom: 24px;
}
.cursor-pointer{
  cursor: pointer;
}
.v-image__image.v-image__image--preload.v-image__image--cover{
  background-image:none !important;
  background-color: #F0F0F0;
}
</style>