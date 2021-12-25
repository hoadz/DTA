<template>
  <div>
    <div class="title-event">
      <div
        class="
          align-center
          cursor-pointer
          d-flex
          justify-space-between
          ml-4
          mr-4
          position-relative
        "
        style="width: 100%; padding: 6px 0px"
       
      >
        <div  @click="emitBack()">
          <i class="fas fa-arrow-left mr-3"></i>
          Chi tiết sự kiện
        </div>
        <button type="button" class="btn btn-danger btn-save" @click="save()">
          Lưu
        </button>
      </div>
    </div>
    <div style="width: 100%; height: calc(100vh - 135px)" class="mt-3 d-flex">
      <div style="width: 35%; padding: 16px">
        <div>
          <div>
            <div class="font-14 font-size: font-weight-black mb-2 mt-3">
              <label for="name">Tên sự kiện *</label>
            </div>
            <input
              class="text-insert text-input"
              type="text"
              id="name"
              placeholder="Nhập tên sự kiện"
              v-model="event.Title"
              style="width: 100%"
            />
            <!-- v-model="user.Name" -->
          </div>
          <div class="color-text font-italic mt-1" v-if="false">
            Email sai định dạng
          </div>
          <div>
            <div class="font-14 font-size: font-weight-black mb-2 mt-5">
              <label>Ngày diễn ra(Dương lịch)</label>
            </div>
            <div
              class="text-day-lunar d-flex justify-space-between text-day-lunar"
            >
              <div>{{ event.textDayLunar }}</div>
              <i class="fas fa-calendar-week mt-1 mr-2"></i>
            </div>
            <!-- v-model="user.Name" -->
          </div>
          <div
            class="d-flex font-13 mb-3 mt-5"
            style="justify-content: space-between"
          >
            <div>
              <span class="font-weight font-14">Ảnh bìa</span>
              <span>(375x300)</span>
            </div>
            <!-- <div style="color: #9e0c10" class="font-weight">
                      Thay ảnh
                    </div> -->
            <image-uploader
              :preview="true"
              :debug="1"
              :autoRotate="true"
              :maxWidth="750"
              :maxHeight="600"
              outputFormat="string"
              @input="setImage"
            >
              <label
                for="fileInput"
                slot="upload-label"
                style="color: #9e0c10"
                class="font-weight cursor-pointer font-14"
              >
                Thay ảnh
              </label>
            </image-uploader>
          </div>
          <!-- {{event.CoverImage == ''}} -->
          <img
            class="flex-1-1-auto"
            v-bind:src="
              event.CoverImage == ''
                ? 'https://dongnaiart.edu.vn/wp-content/uploads/meo_chup_anh_dep_1-1.jpg'
                : event.CoverImage
            "
            style="width: 100%; border-radius: 10px; height: 375px"
            alt=""
          />
        </div>
        <div class="align-center d-flex justify-space-between mt-4">
          <div class="font-weight-500 font-14">
            Các thông báo/lời chúc gửi KH
          </div>
          <button class="button-detail1">Quản lý thông báo</button>
        </div>
      </div>
      <!-- bên phải -->
      <div style="width: 65%; padding: 16px">
        <div>
          <div class="font-14 font-size: font-weight-black mb-2 mt-3">
            <label for="name">Bài thơ - Danh ngôn - Phật giáo</label>
          </div>
          <textarea
            placeholder="Nhập nội dung"
            class="form-control text-area-right"
            rows="8"
            v-model="event.Quote"
          ></textarea>
        </div>
        <div class="font-14 font-size: font-weight-black mb-2 mt-3">
          <label for="name">Nội dung sự kiện</label>
        </div>
        <tiptap-vuetify
          class="tip-tap-ok"
          v-model="event.Content"
          :extensions="extensions"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image,
} from "tiptap-vuetify";
import axios from "axios";
import Quotes from "../models/const/quotes";
import ImageUploader from "vue-image-upload-resize";
import apiClient from "../services/APIClient";
export default {
  name: "DetailEvent",
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify, ImageUploader },
  props: {
    event: {
      Content: "",
      CoverImage: "",
      Quote: "",
      DateEvent: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      EventType: 1,
      Title: "",
      TypeRepeat: 0,
      TimePush: new Date(new Date().setHours(9, 0, 0)),
      ContentPush: "",
    },
  },
  data: () => ({
    extensions: [
      History,
      Image,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
    dayOfYear: 1,
    quotes: Quotes.Data,
    eventTypeData: [
      {
        text: "Không là sự kiện",
        value: 0,
      },
      {
        text: "Sự kiện lịch Âm",
        value: 1,
      },
      {
        text: "Sự kiện lịch Dương",
        value: 2,
      },
    ],
    repeatEventType: [
      {
        text: "Không lặp",
        value: 1,
      },
      {
        text: "Sự kiện hàng tháng",
        value: 2,
      },
      {
        text: "Sự kiện Hàng năm",
        value: 3,
      },
    ],
  }),
  methods: {
    save() {
        this.event.State  = 2;
        apiClient.post(`event`, this.event).then((response) => {
        if (response.Data && response.Success) {
          alert("Cập nhật dữ liệu thành công ");
        }else{
          alert("Cập nhật dữ liệu thất bại ");

        }
      });
    },
    emitBack() {
      this.$emit("back-event", true);
    },

    sendData12: function () {
      console.log("senddata");
      // if (!this.event.CoverImage) {
      //   this.getRandomBase64Image();
      // }
      if (!this.event.Quote) {
        this.getRandomQuote();
      }

      this.event.TimePush = new Date(
        new Date(this.event.DateEvent).setHours(9, 0, 0)
      );

      console.log(this.event.CoverImage);
      // axios
      //   .post("https://localhost:5001/Event", this.event)
      //   .then((response) => {
      //     console.log(this.event);
      //     this.event.Content = "";
      //     this.event.CoverImage = null;
      //     this.event.Quote = "";
      //     this.event.Title = "";
      //     this.event.ContentPush = "";
      //   });
    },
    getday: function () {
      var date = new Date(this.event.DateEvent);
      var start = new Date(date.getFullYear(), 0, 0);
      var diff = date - start;
      var oneDay = 1000 * 60 * 60 * 24;
      this.dayOfYear = Math.floor(diff / oneDay);

      this.dayOfYear = this.dayOfYear === 157 ? 157 : this.dayOfYear % 157;
    },
    setImage: function (file) {
      this.event.CoverImage = file;
      // this.hasImage = true;
      console.log(file);
      // this.image = file;
    },
    getRandomBase64Image: function () {
      var date = new Date(this.event.DateEvent);
      var start = new Date(date.getFullYear(), 0, 0);
      var diff = date - start;
      var oneDay = 1000 * 60 * 60 * 24;
      this.dayOfYear = Math.floor(diff / oneDay);
      setImage(`../assets/Cover/cover_{this.dayOfYear}.png`);
    },
    getRandomQuote: function () {
      var date = new Date(this.event.DateEvent);
      var start = new Date(date.getFullYear(), 0, 0);
      var diff = date - start;
      var oneDay = 1000 * 60 * 60 * 24;
      this.dayOfYear = Math.floor(diff / oneDay);
      this.event.Quote =
        "<p>" +
        this.quotes[this.dayOfYear % 142].Content.replaceAll("\n", "<br>") +
        "<p>";
    },
  },
};
</script>
<style lang="scss" scoped>
.title-event {
  display: flex;
  padding: 6px 0px;
  font-size: 14px;
  border-bottom: thin solid #e0e0e0;
  box-shadow: rgb(0 0 0 / 4%) 0px 3px 6px, rgb(161 161 161 / 9%) 0px 0px 0px;
}
#fileInput {
  display: none;
}
.save-button {
  position: fixed;
  right: 0px;
  top: 50%;
  z-index: 1000;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.my-8 {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
.text-insert {
  //   width: 352px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  height: 40px;
}
.text-day-lunar {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  height: 40px;
  padding: 9px 10px;
  font-size: 15px;
}
</style>
<style lang="scss" >
.tip-tap-ok {
  .tiptap-vuetify-editor__content {
    height: 400px;
  }
}
</style>