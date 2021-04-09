<template>
  <div>
    <span class="h1"> {{ $t("Appointments") }} </span>
    <vs-button
      color="primary"
      class="float-right"
      @click="appointmentsModal = true"
    >
      {{ $t("AddNewBook") }}
    </vs-button>
    <Fullcalendar
      class="mt-10"
      :locale="locale"
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      :header="{
        center: 'title',
        right: 'dayGridMonth, timeGridDay',
        left: 'next today prev',
      }"
      :buttonText="{
        today: $t('Today'),
        month: $t('AsMonth'),
        day: $t('AsToday'),
      }"
      :weekends="true"
      :selectable="true"
      :editable="true"
      :events="events"
      @select="handleSelect"
      @eventClick="handleEventClick"
      @eventResize="updateEvent"
      @eventDrop="updateEvent"
      @eventRender="renderEvent"
    />

    <el-dialog
      :title="$t('AddNewAppointment')"
      :visible.sync="appointmentsModal"
      width="75%"
      style="margin-right: 10%"
    >
      <div class="vx-row">
        <div class="vx-col sm:w-full md:w-full lg:w-1/4">
          <el-select
            v-model="inputs.services"
            multiple
            filterable
            clearable
            collapse-tags
          >
            <el-option
              v-for="(item, index) in services"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/4">
          <el-select
            v-model="inputs.user"
            filterable
            clearable
          >
            <el-option
              v-for="(item, index) in users"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/4">3</div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/4">4</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="appointmentsModal = false">Cancel</el-button>
        <el-button type="primary" @click="appointmentsModal = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
require("@fullcalendar/core/main.min.css");
require("@fullcalendar/daygrid/main.min.css");
require("@fullcalendar/timegrid/main.min.css");
import Fullcalendar from "@fullcalendar/vue";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";
import arLocale from "@fullcalendar/core/locales/ar";

export default {
  data: () => ({
    appointmentsModal: false,
    calendarPlugins: [DayGridPlugin, TimeGridPlugin, InteractionPlugin],
    locale: arLocale,
    events: [],
    services: [],
    users: [],
    inputs: {
      services: "",
      user: "",
    },
  }),
  components: { Fullcalendar },
  methods: {
    newEvent() {},
    renderEvent(arg) {},
    updateEvent(arg) {},
    handleSelect(arg) {},
    handleEventClick(arg) {},
    initData() {
      this.$store.dispatch("services/getData").then((res) => {
        this.services = res.data;
      });
      this.$store.dispatch("users/getData").then((res) => {
        this.users = res.data;
      });
      this.$store.dispatch("appointments/getData").then((res) => {
        this.events = res.data.map((data) => {
          data.title = data.user.name;
          data.start = data.start_time;
          data.end = data.finish_time;
          if (new Date(data.end).getDate() == new Date().getDate()) {
            if (new Date(data.end).getTime() < new Date().getTime()) {
              data.backgroundColor = "#f00";
              data.borderColor = "#f00";
            } else {
              data.backgroundColor = "#00f";
              data.borderColor = "#00f";
            }
          } else if (new Date(data.end).getTime() > new Date().getTime()) {
            data.backgroundColor = "#000";
            data.borderColor = "#000";
          }

          return data;
        });
      });
    },
  },
  created() {
    this.initData();
  },
};
</script>

<style>
.fc-button .fc-icon {
  transform: rotateY(180deg);
}
[dir="rtl"] .fc-rtl {
  text-align: center;
}
[dir="rtl"] .fc-view-container {
  direction: ltr !important;
}
[dir="rtl"] .fc-time-grid-container {
  overflow: visible !important;
  height: unset !important;
}
[dir="rtl"] .fc-time-grid .fc-slats td {
  direction: rtl !important;
}
</style>