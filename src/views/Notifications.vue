<template>
  <div class="" style="padding: 24px 18px; height: calc(100vh - 62px)">
    <div class="d-flex flex-column" style="height: 100%">
      <div class="d-flex" style="justify-content: space-between">
        <div class="text-day-solar font-title">Danh sách thông báo</div>
        <div>
          <!-- <button>Lưu</button> -->
          <!-- <button type="button" class="btn btn-danger btn-save">
            Tạo thông báo
          </button> -->
          <v-dialog v-model="showPopupAddNoti" persistent width="600">
            <template v-slot:activator="{ on, attrs }">
              <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Open Dialog
              </v-btn> -->
              <button
                type="button"
                class="btn btn-danger btn-save"
                v-bind="attrs"
                v-on="on"
                @click="showAddNoti()"
              >
                Tạo thông báo
              </button>
            </template>
            <v-card>
              <v-card-title class="text-h5"> {{formTitle}} </v-card-title>
              <v-card-text>
                <div
                  class="font-13 font-weight mb-2 flex-column text-title-name"
                >
                  Nội dung thông báo/Lời chúc
                </div>
                <div
                  style="width: 100%; height: 120px"
                  class="mb-3 flex-1-0-auto"
                >
                  <textarea
                    placeholder="Nhập nội dung"
                    class="form-control text-area-right"
                    rows="3"
                  ></textarea>
                </div>
                <div>
                  <div class="text-title-name">Ngày gửi</div>

                  <div style="width: 250px">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="computedDateFormatted"
                          persistent-hint
                          prepend-icon="prepend"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        >
                          <template #prepend>
                            <v-icon right> mdi-calendar </v-icon>
                          </template></v-text-field
                        >
                      </template>
                      <v-date-picker
                        v-model="date"
                        :header-date-format="getHeaderDateFormat"
                        no-title
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </div>
                <div>
                  <div class="text-title-name">Giờ gửi thông báo/lời chúc</div>

                  <div>
                    <v-dialog v-model="showPopupPicker" persistent width="300">
                      <v-card>
                        <div>
                          <v-time-picker
                            v-model="picker"
                            scrollable
                          ></v-time-picker>
                        </div>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <button
                            class="button-noti mr-3"
                            style="color: #9e0c10; border: 1px solid #d9d9d9"
                            @click="showPopupPicker = false"
                          >
                            Đóng
                          </button>
                          <button
                            class="button-noti backgroud-button"
                            @click="chooseTimeFn()"
                          >
                            Áp dụng
                          </button>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-radio-group
                      v-model="typeDateSend"
                      row
                      v-on:change="changeEvent"
                    >
                      <v-radio label="Mặc định" value="1"></v-radio>
                      <v-radio label="Tùy chỉnh" value="2"> </v-radio>
                      <v-radio label="Gửi ngay" value="3"></v-radio>
                    </v-radio-group>
                  </div>
                  <div class="date-send-noti">{{ dateSendNotiString }}</div>
                </div>
              </v-card-text>
              <v-card-actions class="footer">
                <v-spacer></v-spacer>
                <!-- <v-btn
                  color="green darken-1"
                  text
                  @click="showPopupAddNoti = false"
                >
                  Disagree
                </v-btn> -->
                <button
                  class="button-noti mr-3"
                  style="color: #9e0c10; border: 1px solid #d9d9d9"
                  @click="showPopupAddNoti = false"
                >
                  Đóng
                </button>
                <button
                  class="button-noti backgroud-button"
                  @click="showPopupAddNoti = false"
                >
                  Áp dụng
                </button>
              </v-card-actions>
              <div></div>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <div class="custom-1 flex-1-1-auto mt-4 table-noti">
        <v-data-table :headers="headers" :items="desserts" hide-default-footer>
          <template v-slot:item.actions="{ item }">
            <!-- @click="editItem(item)" -->
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <!-- @click="deleteItem(item)" -->
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationsView",

  data: () => ({
    showPopupAddNoti: false,
    headers: [
      {
        text: "STT",
        align: "center",
        sortable: false,
        value: "STT",
      },
      {
        text: "Ngày diễn ra sự kiện",
        align: "center",
        sortable: false,
        value: "StartDate",
      },
      {
        text: "Giờ gửi thông báo",
        align: "center",
        sortable: false,
        value: "StartSendNoti",
      },
      {
        text: "Nội dung thông báo",
        align: "center",
        sortable: false,
        value: "dataNoti",
      },

      {
        text: "",
        align: "center",
        sortable: false,
        value: "actions",
      },
    ],
    desserts: [
      {
        STT: "1",
        StartDate: 159,
        StartSendNoti: 6.0,
        dataNoti: 24,
      },
      {
        STT: "2",
        StartDate: 237,
        StartSendNoti: 9.0,
        dataNoti: 37,
      },
      {
        STT: "3",
        StartDate: 262,
        StartSendNoti: 16.0,
        dataNoti: 23,
      },
      {
        STT: "4",
        StartDate: 305,
        StartSendNoti: 3.7,
        dataNoti: 67,
      },
      {
        STT: "5",
        StartDate: 356,
        StartSendNoti: 16.0,
        dataNoti: 49,
      },
      {
        STT: "6",
        StartDate: 375,
        StartSendNoti: 0.0,
        dataNoti: 94,
      },
      {
        STT: "7",
        StartDate: 392,
        StartSendNoti: 0.2,
        dataNoti: 98,
      },
      {
        STT: "8",
        StartDate: 408,
        StartSendNoti: 3.2,
        dataNoti: 87,
      },
      {
        STT: "9",
        StartDate: 452,
        StartSendNoti: 25.0,
        dataNoti: 51,
      },
      {
        STT: "10",
        StartDate: 518,
        StartSendNoti: 26.0,
        dataNoti: 65,
      },
    ],
    // - new Date().getTimezoneOffset() * 60000)
    //   .toISOString()
    //   .substr(0, 10)
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    mydate: Date.now(),
    menu: false,
    modal: false,
    menu2: false,
    showChooseTime: false,
    typeDateSend: "1",
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
    showPopupPicker: false,
    picker: "09:00",
    dateSendNoti: new Date(),
    dateSendNotiString: "",
    editedIndex: -1,
    editedItem: {
      STT: "",
      StartDate: "",
      StartSendNoti: "",
      dataNoti: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tạo thông báo" : "Sửa thông báo";
    },
    computedDateFormatted() {
      if (+this.typeDateSend == 1) {
        var date = new Date(this.date);
        date.setHours(9);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        this.mydate = date;
        // date = this.date.toISOString().substr(0, 10);
      }
      this.dateSendNotiString = this.computedDateSendNoti();
      return this.formatDate(this.mydate);
    },

    parsedDirection() {
      return this.direction.split(" ");
    },
  },
  created: function () {
    // `this` points to the vm instance
    // console.log("a is: " + this.a);
    // this.dateSendNotiString = this.computedDateSendNoti(this.date);
  },
  methods: {
    editItem(item) {
       this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.user = this.editedItem;
      // call service
      this.showPopupAddNoti = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    initialize() {
      // call serive
    },
    getHeaderDateFormat(isoDate) {
      var arrDate = isoDate.split("-");
      // console.log("getHeaderDateFormat: " + isoDate);
      return `Tháng ${arrDate[1]} - ${arrDate[0]}`;
    },

    computedDateSendNoti() {
      if (this.mydate) {
        return `${this.mydate.getHours()}:${+this.mydate.getMinutes()}${
          this.mydate.getMinutes() <= 9 ? "0" : ""
        }`;
      }
      return null;
    },
    showAddNoti() {},
    randomColor() {
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    },
    formatDate(date) {
      if (!date) return null;

      var month = date.getUTCMonth() + 1; //months from 1-12.
      var day = date.getUTCDate();
      var year = date.getUTCFullYear();
      return `${day}/${month}/${year}`;
      // return `1`;
    },
    changeEvent() {
      console.log(this.typeDateSend);
      if (+this.typeDateSend == 2) {
        this.showPopupPicker = true;
      }
    },
    chooseTimeFn() {
      this.showPopupPicker = false;
      if (this.picker) {
        let arrayStrig = this.picker.split(":");
        this.mydate.setHours(arrayStrig[0]);
        this.mydate.setMinutes(arrayStrig[1]);
        this.mydate.setSeconds(0);
        this.dateSendNotiString = this.computedDateSendNoti();
      }
      // this.dateSendNoti =
    },
  },
};
</script>
<style lang="scss" scoped>
.font-title {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
}
</style>
<style lang="scss">
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  color: #000000;
  font-weight: bold !important;
  font-size: 14px;
}
.v-data-table-header {
  border: 2px solid #f5f5f5;
  background: #d9d9d9;
  color: #000000 !important;
  border-radius: 103px;
}
.table-noti {
  table {
    border-collapse: collapse;
    tbody {
      border: thin solid #d9d9d9;
    }
  }
}

.text-title-name {
  font-weight: 500;
  color: #000000;
  font-size: 14px;
}

.footer {
  border-top: thin solid #d9d9d9;
}
</style>
<style lang="scss">
.v-dialog > .v-card > .v-card__actions {
  padding: 8px 20px;
}
.v-input.v-input--is-label-active.v-input--is-dirty.v-input--is-readonly.theme--light.v-text-field.v-text-field--is-booted {
  position: relative;
  .v-input__prepend-outer {
    position: absolute;
    right: 0;
  }
}
.date-send-noti {
  background: #f5f5f5;
  border-radius: 6px;
  width: 143px;
  height: 40px;
  padding: 9px 12px;
  color: #000000;
}
.v-btn__content{
  font-size: 12px;
}
</style>
