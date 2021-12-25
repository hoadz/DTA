<template>
  <div>
    <h3>{{ dayOfYear }}</h3>
    <v-row>
      <v-col>
        <v-date-picker v-model="event.DateEvent"> </v-date-picker>
         <v-btn
          class="mr-0 "
          color="primary"
          min-width="100"
          rounded
          v-on:click="getday"
        >
          Get day of year
        </v-btn>
        <v-btn
          class="mr-0 save-button"
          color="primary"
          min-width="100"
          rounded
          v-on:click="sendData12"
        >
          Lưu
        </v-btn>
      </v-col>
      <v-col>
        <v-row
          ><v-text-field label="Tên sự kiện" v-model="event.Title" />
        </v-row>
        <v-row>
          <v-col
            ><v-select
              :items="repeatEventType"
              filled
              label="Loại lặp"
              v-model="event.TypeRepeat"
              item-text="text"
              item-value="value"
            ></v-select
          ></v-col>
          <v-col
            ><v-select
              :items="eventTypeData"
              filled
              label="Lịch dương hay âm"
              v-model="event.EventType"
              item-text="text"
              item-value="value"
            ></v-select
          ></v-col>
        </v-row>
        <v-row
          ><div>
            <h2 class="mb-3">image</h2>
            <!-- <input type="text" id="abc"> -->
            <image-uploader
              :preview="true"
              :debug="1"
              :autoRotate="true"
              :maxWidth="750"
              :maxHeight="600"
              outputFormat="string"
              @input="setImage"
            >
              <label for="fileInput" slot="upload-label">
                <figure>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path
                      class="path1"
                      d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
                    ></path>
                  </svg>
                </figure>
                <!-- <span class="upload-caption">{{
            hasImage ? "Replace" : "Click to upload"
          }}</span> -->
              </label>
            </image-uploader>
          </div></v-row
        >
      </v-col>
    </v-row>

    <v-row>
      <v-row>
        <v-col>
          <v-textarea
            name="input-7-1"
            label="Quote"
            v-model="event.Quote"
            hint="Quote"
          ></v-textarea
        ></v-col>
        <v-col>
          <v-textarea
            name="input-7-1"
            label="Notification Content"
            v-model="event.ContentPush"
            hint="noti"
          ></v-textarea
        ></v-col>
      </v-row>
      <v-col
        ><div>
          <h2 class="mb-3">content</h2>
          <!-- <input type="text" id="abc"> -->
          <tiptap-vuetify
            v-model="event.Content"
            :extensions="extensions"
          /></div
      ></v-col>
    </v-row>
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
export default {
  name: "TextEditorView",
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify, ImageUploader },
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
  }),
  methods: {
    sendData12: function () {
      console.log("senddata");
      // if (!this.event.CoverImage) {
      //   this.getRandomBase64Image();
      // }
      if (!this.event.Quote) {
        this.getRandomQuote();
      }

      this.event.TimePush = new Date(new Date(this.event.DateEvent).setHours(9,0,0));

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
      this.dayOfYear = Math.floor(diff / oneDay) ;

      this.dayOfYear = this.dayOfYear === 157 ? 157 : this.dayOfYear % 157
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
<style lang="scss">
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
</style>
