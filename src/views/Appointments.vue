<template>
  <div>
    <vs-button @click="popupActive=true">{{
      $t("AddNewBook")
    }}</vs-button>
    <Fullcalendar
      class="mt-3"
      :locale="locale"
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      :header="{
        center: 'title',
        right: 'dayGridMonth, timeGridDay',
        left: 'next today prev',
      }"
      :buttonText="{
        today: 'اليوم',
        month: 'حسب الشهر',
        day: 'حسب اليوم',
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

    <vs-popup
      class="holamundo"
      :title="$t('AddNewService')"
      :active.sync="popupActive"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </vs-popup>
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
    popupActive:false,
    calendarPlugins: [DayGridPlugin, TimeGridPlugin, InteractionPlugin],
    locale: arLocale,
    events: [],
  }),
  components: { Fullcalendar },
  methods: {
    newEvent() {},
    renderEvent(arg) {},
    updateEvent(arg) {},
    handleSelect(arg) {},
    handleEventClick(arg) {},
    initData() {
        this.$store.dispatch("appointment/getData").then(res => {
            this.events= res.data.resources.map(data=> {
                data.title= data.user.name;
                data.start= data.start_time;
                data.end = data.finish_time;
                if(new Date(data.end).getDate() == new Date().getDate()) {
                    data.backgroundColor= "#00f";
                    data.borderColor= "#00f";
                }
                else if(new Date(data.end).getDate() < new Date().getDate()) {
                    data.backgroundColor= "#f00";
                    data.borderColor= "#f00";
                }
                else if(new Date(data.end).getDate() > new Date().getDate()) {
                    data.backgroundColor= "#000";
                    data.borderColor= "#000";
                }
                
                return data;
            });
            console.log(this.events);
        })
    },
  },
  created() {
      this.initData();
  }
};
</script>

<style>
.fc-button .fc-icon {
  transform: rotateY(180deg);
}
[dir="rtl"] .fc-rtl {
  text-align: center;
  padding-top: 25px;
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