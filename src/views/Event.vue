<template>
  <div id="event-view">
    <div v-show="showDetailEvent">
      <DetailEvent
        :event="currentEvent"
        @back-event="showDetailEvent = false"
      ></DetailEvent>
    </div>
    <div v-show="!showDetailEvent">
      <div class="title-event">
        <div
          class="mr-4 cursor-pointer position-relative"
          style="padding: 6px 0px"
          :class="{ 'color-text': tabActive == 1 }"
          @click="tabActive = 1"
        >
          Chi tiết ngày
          <hr class="hr-active-left" v-if="tabActive == 1" />
        </div>
        <div
          class="cursor-pointer position-relative ml-4"
          style="padding: 6px 0px"
          :class="{ 'color-text': tabActive == 2 }"
          @click="getListEvent()"
        >
          Danh sách các sự kiện
          <hr class="hr-active-right" v-if="tabActive == 2" />
        </div>
      </div>
      <div class="container-event d-flex">
        <div class="col-4">
          <!-- <v-select :items="items" v-model="select"></v-select> -->
          <div style="height: 72px"></div>
          <lunar-calendar
            :first-day-of-week="parseInt(firstDayOfWeek)"
            :disable-days-before-today="disableDaysBeforeToday"
            :default-date="defaultDate"
            :showLunarButton="false"
            :show-lunar="true"
            :lang="dateLangValue"
            :date-lang="dateLangValue"
            :custom-cells="customCells"
            @change="onChange"
          />
        </div>
        <div class="col-8">
          <div
            class="d-flex flex-column title-menuright"
            style="height: 100%"
            v-if="tabActive == 1"
          >
            <div class="d-flex" style="justify-content: space-between">
              <div>
                <div class="text-day-solar">
                  <span>{{ dayName }}</span
                  >, <span>{{ solarDateConvert }}</span>
                </div>
                <div style="font-size: 13px">ÂL: {{ lunarDateConvert }}</div>
              </div>
              <div>
                <!-- <button>Lưu</button> -->
                <button type="button" class="btn btn-danger btn-save">
                  Lưu
                </button>
              </div>
            </div>
            <div class="mt-4 flex-1-1-auto" v-if="checkHasData">
              <div class="custom-1 d-flex flex-column" style="height: 55%">
                <div class="font-weight font-18 mb-2">Chi tiết ngày</div>
                <div class="d-flex" style="height: 80%">
                  <div class="col-6 d-flex flex-column pr-3">
                    <div
                      class="d-flex font-13 mb-2"
                      style="justify-content: space-between"
                    >
                      <div>
                        <span class="font-weight font-13">Ảnh bìa</span>
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
                          class="font-weight cursor-pointer"
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
                      style="
                        width: 100%;
                        border-radius: 10px;
                        height: calc(100% - 20px);
                      "
                      alt=""
                    />
                  </div>
                  <div class="col-6 pl-3 flex-col">
                    <div class="font-13 font-weight mb-2 flex-column">
                      Bài thơ - Danh ngôn - Phật giáo
                    </div>
                    <div
                      style="width: 100%; height: calc(100% - 20px)"
                      class="flex-1-0-auto"
                    >
                      <textarea
                        placeholder="Nhập nội dung"
                        class="form-control text-area-right"
                        rows="3"
                        v-model="event.Quote"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="ml-2 mt-2">
                  <!-- v-model="checkbox" -->
                  <v-checkbox
                    v-model="event.HasLayer"
                    label="Sử dụng lớp layer phủ lên ảnh"
                  ></v-checkbox>
                </div>
              </div>
              <div class="font-20 font-weight-black mb-3 mt-5">
                Sự kiện trong ngày
              </div>
              <div class="d-flex flex-column mt-4">
                <div
                  class="
                    align-center
                    custom-event-to-day
                    d-flex
                    justify-space-between
                  "
                  style="height: 60px"
                  v-for="item of listEventToDay"
                  :key="item.ID"
                >
                  <div class="font-16 font-weight">
                    {{ item.Title }}
                  </div>
                  <button class="button-detail" @click="clickShowDetail(item)">
                    Chi tiết
                  </button>
                  <!-- <div></div> -->
                </div>
              </div>
            </div>
            <div
              class="custom-2 d-flex flex-1 flex-column mt-4"
              v-if="!checkHasData"
            >
              <div class="font-20 font-weight-black mb-3">
                Sự kiện trong ngày
              </div>
              <div
                class="
                  align-center align-ite
                  d-flex
                  flex-1 flex-column
                  justify-center
                "
              >
                <div class="fit-content mb-4">Không có sự kiện trong ngày</div>
              </div>
            </div>
          </div>
          <div
            class="d-flex flex-column title-menuright"
            style="height: 100%"
            v-if="tabActive == 2"
          >
            <div class="d-flex" style="justify-content: space-between">
              <div class="text-day-solar">Danh sách sự kiện</div>
              <div>
                <!-- <button>Lưu</button> -->
                <!-- <button
                  type="button"
                  class="btn btn-danger btn-save"
                  @click="showDialogEvent = true"
                >
                  Tạo sự kiện
                </button> -->
              </div>
            </div>
            <div class="custom-listevent flex-1-1-auto mt-4 overflow-y-auto">
              <div v-for="itemYear of arrEvents" :key="itemYear.month">
                <div
                  v-for="itemMonth of itemYear.DataMonth"
                  :key="itemMonth.month"
                >
                  <div class="font-18 font-weight mb-2">
                    Tháng {{ itemMonth.month }}, Năm {{ itemYear.Year }}
                  </div>
                  <div
                    v-for="event of itemMonth.DataEvent"
                    :key="event.ID"
                    class="align-center d-flex justify-center mb-3"
                  >
                    <div class="button-date mr-4">
                      <div>{{ event.DaySolar }}</div>
                    </div>
                    <div class="d-flex justify-space-between right-button-date">
                      <div>
                        <div>{{ event.Title }}</div>
                        <div>ÂL: {{ event.DateLunar }}</div>
                      </div>
                      <div
                        class="align-center d-flex cursor-pointer"
                        @click="showDetailEventFn(event)"
                      >
                        <i class="far fa-edit"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <v-dialog v-model="showDialogEvent" max-width="800px" persistent>
        <v-card>
          <!-- <v-card-title>
          <span class="text-h6">{{ formTitle }}</span>
        </v-card-title> -->
          <v-card-title class="text-h5"> {{ formTitle }} </v-card-title>
          <v-card-text>
            <div class="flex-column d-flex">
              <div class="d-flex flex-1-1-auto">
                <div class="col-6 d-flex flex-column pr-3">
                  <div
                    class="d-flex font-13 mb-2"
                    style="justify-content: space-between"
                  >
                    <div>
                      <span class="font-weight font-13">Ảnh bìa</span>
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
                        class="font-weight cursor-pointer"
                      >
                        Tải ảnh lên
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
                    style="
                      width: 100%;
                      border-radius: 10px;
                      height: calc(100% - 20px);
                    "
                    alt=""
                  />
                </div>
                <div class="col-6 pl-3 flex-col">
                  <div class="font-13 font-weight mb-2 flex-column">
                    <div class="font-14 font-weight-black mb-2">
                      <label for="nameEvent">Tên sự kiện </label>
                    </div>
                    <input
                      class="text-insert text-input"
                      type="text"
                      placeholder="Nhập tên sự kiện"
                      id="nameEvent"
                      v-model="event.Title"
                    />
                  </div>
                  <div>
                    <div>Lặp lại</div>
                    <v-radio-group v-model="event.EventType">
                      <v-radio label="Không lặp lại" :value="1"></v-radio
                      ><v-radio label="Hàng tháng" :value="2"></v-radio
                      ><v-radio label="Hàng năm" :value="3"></v-radio
                      ><v-radio label="Hàng tuần" :value="4"></v-radio
                      ><v-radio label="Hàng ngày" :value="5"></v-radio>
                    </v-radio-group>
                  </div>
                </div>
              </div>
              <hr class="mb-3" />
              <div class="font-weight mb-3">Nội dung sự kiện</div>
              <div class="tiptap-oke2">
                <tiptap-vuetify
                  v-model="event.Content"
                  :extensions="extensions"
                />
              </div>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="blue darken-1" text @click="close">
                      Hủy
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      lưu
                    </v-btn> -->
            <button
              class="button-noti mr-3"
              style="color: #9e0c10; border: 1px solid #d9d9d9"
              @click="close"
            >
              <!-- @click="close" -->
              Hủy
            </button>
            <!-- @click="save" -->
            <button class="button-noti backgroud-button">Lưu</button>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
import lunarCalendar from "vue-lunar-calendar";
import moment from "moment";
import ImageUploader from "vue-image-upload-resize";
import "moment-lunar";
import formatDate from "../common/commonFn";
import $ from "jquery";
import apiClient from "../services/APIClient";
import DetailEvent from "./DetailEvent.vue";
//  defaultDate: today,
export default {
  name: "EventView",
  components: {
    "lunar-calendar": lunarCalendar,
    ImageUploader,
    TiptapVuetify,
    DetailEvent,
  },
  data() {
    const today = moment();
    return {
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
      firstDayOfWeek: 1,
      tabActive: 1,
      disableDaysBeforeToday: false,
      defaultDate: today.format("YYYY-MM-DD"),
      dateLangValue: "vi",
      customCells: [
        {
          days: [
           
          ],
          customCellClass: "111",
          groupName: "111",
        },
        {
          days: [],
          customCellClass: "2222",
          groupName: "22222",
        },
      ],
      items: ["2021", "2022"],
      select: "2021",
      event: {
        Content: "",
        CoverImage: "",
        Quote: "",
        DateEvent: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        EventType: 1,
        Title: "",
        HasLayer: false,
      },
      solarDateConvert: today.format("DD/MM/YYYY"),
      solarDate: new Date(),
      lunarDate: today,
      lunarDateConvert: "",
      dayName: "",
      editedIndex: -1,
      showDialogEvent: false,
      checkHasData: false,
      listEventToDay: [],
      showDetailEvent: false,
      currentEvent: {},
      arrEvents: [],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tạo mới sự kiện" : "Sửa sự kiện";
    },
  },
  methods: {
    showDetailEventFn(event) {
      const me = this;
      if (event) {
        // gan thang event kia thanh
        apiClient.get(`event/getbyid/${event.ID}`).then((response) => {
          if (response.Data && response.Success) {
            var a = 1;
            //  this.clickShowDetail(response.Data[0]);
            let element = response.Data[0];
            let y = new Date(element.DateEvent).getFullYear();
            let d = new Date(element.DateEvent).getDate();
            let m = new Date(element.DateEvent).getMonth();
            // new Date(element.Month).getMonth()
            if (element.EventType == 1) {
              // part date year
              //part date month
              // let d = date ngay
              // lay ra du lieu bao gom duong , nam duong , thang duong
              element.FullDaySolar = this.formatSolar(d, m, y);
              var arrDate = element.FullDaySolar.split("/");
              element.DaySolar = +arrDate[0];
              element.MonthSolar = +arrDate[1];
              element.YearSolar = +arrDate[2];
              element.DateLunar = `${d}/${m}/${y}`;
            } else if (element.EventType == 2) {
              element.YearSolar = y;
              element.MonthSolar = m + 1;
              element.DaySolar = d;
              element.DateLunar = this.formatLunar(d, m, y);
            }
            me.currentEvent = element;
            me.currentEvent.textDayLunar = `${element.FullDaySolar} (ÂL: ${element.DateLunar})`;
            me.showDetailEvent = true;
          }
        });
      }
    },
    formatLunar(d, m, y) {
      return moment().year(y).month(m).date(d).lunar().format("DD/MM/YYYY");
    },
    formatSolar(d, m, y) {
      return moment().year(y).month(m).date(d).solar().format("DD/MM/YYYY");
    },

    // formatYearSolar(d, m, y) {
    //   return moment().year(y).month(m).date(d).solar().format("YYYY");
    // },
    // formatMonthSolar(d, m, y) {
    //   return moment().year(y).month(m).date(d).solar().format("MM");
    // },
    // formatDaySolar(d, m, y) {
    //   return moment().year(y).month(m).date(d).solar().format("dd");
    // },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },

    getListEvent() {
      console.log(1);
      const me = this;
      let month = this.solarDate.getMonth() + 1;
      apiClient.post(`event/GetByMonth/${month} `).then((response) => {
        if (response.Data && response.Success) {
          me.tabActive = 2;
          let datas = response.Data;

          datas.forEach((element) => {
            // new Date(element.Year).getFullYear()
            let y = element.Year;
            let d = new Date(element.DateEvent).getDate();
            let m = element.Month - 1;
            // new Date(element.Month).getMonth()
            if (element.EventType == 1) {
              // part date year
              //part date month
              // let d = date ngay
              // lay ra du lieu bao gom duong , nam duong , thang duong
              element.FullDaySolar = this.formatSolar(d, m, y);
              var arrDate = element.FullDaySolar.split("/");
              element.DaySolar = +arrDate[0];
              element.MonthSolar = +arrDate[1];
              element.YearSolar = +arrDate[2];
              element.DateLunar = `${d}/${m}/${y}`;
            } else if (element.EventType == 2) {
              element.YearSolar = y;
              element.MonthSolar = m + 1;
              element.DaySolar = d;
              element.DateLunar = this.formatLunar(d, m, y);
            }
          });
          // lay ra năm không trùng
          let listYears = datas
            .map((e) => e.YearSolar)
            .filter(me.onlyUnique)
            .filter((e) => e != null && e != undefined)
            .sort();
          me.arrEvents = [];

          listYears.forEach((year) => {
            let yearS = [];
            // lấy ra tháng của năm đó
            var listMonth = datas
              .filter((e) => e.YearSolar == year)
              .map((e) => e.MonthSolar)
              .filter(me.onlyUnique);
            listMonth.forEach((month) => {
              // push hết sự kiện của tháng đó vào
              let monthS = {};
              let eventMonth = datas.filter(
                (e) => e.MonthSolar == month && e.YearSolar == year
              );
              monthS.month = month;
              monthS.DataEvent = eventMonth;
              yearS.push(monthS);
            });
            yearS = yearS.sort((a, b) => a.month - b.month);
            me.arrEvents.push({
              Year: year,
              DataMonth: yearS,
            });
          });
          var a = 1;
          console.log(me.arrEvents);
          // tao 1 array
          // for qua list tren push het year ko trung lap vao
          // sort year do be toi lon
          // for qua list year filter het thang thuoc year do xong map vao
          //for qua month push het event thuoc month do vao
        }
      });
    },
    clickShowDetail(e) {
      this.currentEvent = e;
      this.currentEvent.textDayLunar = `${this.solarDateConvert} (ÂL: ${this.lunarDateConvert})`;
      this.showDetailEvent = true;
    },
    close() {
      this.showDialogEvent = false;
      this.$nextTick(() => {
        // this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    formatDate(date) {
      return date.format("YYYY-MM-DD");
    },
    onChange(solarDate, lunarDate, isLunarChecked) {
      // console.log("11",moment().year(2021).month(11).date(24).lunar().format('YYYY-MM-DD'));
      // console.log("22",moment().year(2021).month(10).date(21).solar().format('YYYY-MM-DD'));

      if (solarDate) this.solarDate = solarDate._d;

      this.event.DateEvent = this.solarDate.toISOString();
      this.lunarDate = lunarDate;
      this.solarDateConvert = formatDate(this.solarDate);
      this.lunarDateConvert = formatDate(this.lunarDate);
      // this.isLunarChecked = isLunarChecked;
      // this.inputDate = this.solarDate;

      const eventTime = {
        LunarDate: this.lunarDate.toISOString(),
        SolarDate: this.solarDate.toISOString(),
      };

      apiClient.post(`event/GetByDate`, eventTime).then((response) => {
        if (response.Data && response.Success) {
          this.listEventToDay = response.Data;

          if (this.listEventToDay && this.listEventToDay.length > 0) {
            this.event = this.listEventToDay[0];
            console.log(this.event.HasLayer);
            this.checkHasData = true;
          } else {
            this.checkHasData = false;
          }
        }
      });
    },
    customLumna() {
      // $(".calendar-month").html("Hello <b>world</b>!");
      // console.log(moment.localeData().firstDayOfWeek());
    },
    setImage: function (file) {
      this.event.CoverImage = file;
      // this.hasImage = true;
      console.log(file);
      // this.image = file;
    },
    convertDayDisplay(current_day) {
      var day_name = "";

      // Lấy tên thứ của ngày hiện tại
      switch (current_day) {
        case 0:
          day_name = "Chủ nhật";
          break;
        case 1:
          day_name = "Thứ hai";
          break;
        case 2:
          day_name = "Thứ ba";
          break;
        case 3:
          day_name = "Thứ tư";
          break;
        case 4:
          day_name = "Thứ năm";
          break;
        case 5:
          day_name = "Thứ sau";
          break;
        case 6:
          day_name = "Thứ bảy";
      }
      this.dayName = day_name;
    },
  },
  mounted() {
    this.customLumna();
  },
  created() {
    // console.log(this.defaultDate);
    this.convertDayDisplay(new Date().getDay());
  },
};
</script>

<style lang="scss" scoped>
.title-menuright {
  padding: 0px 16px;
}
.title-event {
  display: flex;
  justify-content: center;
  padding: 6px 0px;
  font-size: 14px;
  border-bottom: thin solid #e0e0e0;
  box-shadow: rgb(0 0 0 / 4%) 0px 3px 6px, rgb(161 161 161 / 9%) 0px 0px 0px;
}
// ::v-deep .calendar-month{
//     color: red !important;
// }
.custom-cell {
  background: mediumturquoise;
}
.custom-cell-2 {
  background: purple;
}
/*
custom user color
*/
.custom-seleted-cell {
  background: #222944;
}
.custom-cell .solar,
.custom-cell-2 .solar {
  color: #ffffff;
}

.text-day-solar {
  font-size: 21px;
  font-weight: 600;
}

.custom-1 {
  border: thin solid #c5cbd0;
  padding: 14px;
  border-radius: 10px;
}

.container-event {
  overflow-y: hidden;
  height: 100%;
  height: calc(100vh - 110px);
}
.custom-2 {
  height: 42%;
  border: thin solid #c5cbd0;
  padding: 14px;
  border-radius: 10px;
}
.fit-content {
  width: fit-content;
}
</style>

<style lang="scss">
#fileInput {
  display: none;
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

.img-preview {
  display: none;
}

.hr-active-left {
  left: -17px;
  bottom: -7px;
  position: absolute;
  width: 111px;
  height: 4px;
  background: #9e0c10;
  border-radius: 12px;
}
.hr-active-right {
  width: 178px;
  left: -16px;
  bottom: -7px;
  position: absolute;
  background: #9e0c10;
  border-radius: 12px;
  height: 4px;
}
.text-insert {
  width: 352px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  height: 40px;
}
// .v-card__title  {
//   padding: 0 !important;
// }
// .text-h6 {
//   padding-top: 16px;
//   padding-left: 20px;
// }
.v-input.v-input--is-label-active.v-input--is-dirty.theme--light.v-input--selection-controls.v-input--radio-group.v-input--radio-group--column {
  margin-top: 5px;
}
label.v-label.theme--light {
  font-size: 14px;
  color: #595959;
}
.v-btn--fab.v-size--default .v-icon,
.v-btn--fab.v-size--small .v-icon,
.v-btn--icon.v-size--default .v-icon,
.v-btn--icon.v-size--small .v-icon {
  height: 15px;
  font-size: 17px;
  width: 8px;
}
.v-dialog > .v-card > .v-card__actions {
  padding: 8px 23px;
}
.tiptap-oke2 {
  .tiptap-vuetify-editor__content {
    height: 170px;
  }
}
.v-input--selection-controls {
  margin-top: 0px;
  padding-top: 0px;
}
.v-input--selection-controls__ripple.primary--text {
  color: #9e0c10 !important;
  caret-color: #9e0c10 !important;
}
.v-application .primary--text {
  color: #9e0c10 !important;
  caret-color: #9e0c10 !important;
}
.v-messages.theme--light.primary--text {
  display: none;
}
.v-input__slot {
  margin-bottom: 0px;
}
.v-messages.theme--light {
  display: none;
}
.custom-event-to-day {
  height: 50px;
  border: thin solid #c5cbd0;
  padding: 14px;
  border-radius: 10px;
}
.custom-listevent {
  border: thin solid #c5cbd0;
  padding: 24px;
  border-radius: 10px;
}
.button-date {
  min-width: 48px;
  height: 48px;
  background: radial-gradient(50% 50% at 50% 50%, #a30d12 43.23%, #630202 100%);
  border-radius: 28px;
  font-size: 24px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.right-button-date {
  height: 88px;
  background: #f0f0f0;
  border-radius: 8px;
  width: 100%;
  padding: 16px;
}
</style>
