<template>
  <div>
    <span class="h1"> {{ $t("Appointments") }} </span>
    <vs-button
      color="primary"
      class="float-right"
      @click="addNew"
    >
      <span>{{ $t("AddNewBook") }}</span>
    </vs-button>


      <vs-table id="booksTable"
    max-items="10" 
    pagination
    search 
     :noDataText="$t('NoData')"
     stripe :data="events">
      <template slot="thead">
        <vs-th sort-key="user.id">
          {{$t('User')}}
        </vs-th>
        <vs-th sort-key="start_time">
          {{$t('Date')}}
        </vs-th>
         <vs-th sort-key="start_time">
          {{$t('StartTime')}}
        </vs-th>
         <vs-th sort-key="finish_time">
          {{$t('EndTime')}}
        </vs-th>
        <vs-th sort-key="status">
          {{$t('Status')}}
        </vs-th>
		<vs-th>
          {{$t('Actions')}}
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr v-for="(tr, indextr) in data" :key="indextr">
          <vs-td :data="data[indextr].user">
            {{data[indextr].user.name}}
          </vs-td>

          <vs-td :data="data[indextr].start_time">
            {{data[indextr].start_time.toString().substring(0,10)}}
          </vs-td>

          <vs-td :data="data[indextr].start_time">
            {{data[indextr].start_time.toString().substring(11,16)}}
          </vs-td>

          <vs-td :data="data[indextr].finish_time">
            {{data[indextr].finish_time.toString().substring(11,16)}}
          </vs-td>

            <vs-td :data="data[indextr].status">
           <span v-if="data[indextr].status == 0">
             <h5 style="color:#000;font-weight:bold;">{{$t('NewBook')}}</h5>
           </span>
           <span v-else-if="data[indextr].status == 1">
             <h5 style="color:#00f;font-weight:bold;">{{$t('InprogressBook')}}</h5>
           </span>
            <span v-else-if="data[indextr].status == 2">
             <h5 style="color:#0f0;font-weight:bold;">{{$t('EndBook')}}</h5>
           </span>
           <span v-else-if="data[indextr].status == 3">
             <h5 style="color:#f00;font-weight:bold;">{{$t('RemoveBook')}}</h5>
           </span>
          </vs-td>

		  <vs-td>
           <feather-icon @click="editData(data[indextr])" icon="EditIcon" class="mr-2 cursor editIcon" />
		      <feather-icon @click="openConfirm(data[indextr].id)" icon="DeleteIcon" class="mr-2 cursor deleteIcon" />
          </vs-td>
        </vs-tr>
      </template>
	  
    </vs-table>


    <el-dialog
      :title="editMode?$t('EditBook'):$t('AddNewBook')"
      :visible.sync="appointmentsModal"
      width="75%"
      style="margin-right: 10%"
    >
      <div class="vx-row">
        <div class="vx-col sm:w-full md:w-full lg:w-4/4">
          <label>{{ $t("Services") }}</label>
          <el-select
            style="width: 100%"
            class="mt-2"
            v-model="inputs.services"
            multiple
            filterable
            clearable
            :placeholder="$t('Select')"
          >
            <el-option
              v-for="item in services"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/4 mt-3">
          <label>{{ $t("User") }}</label>
          <el-select class="mt-2" v-model="inputs.user_id" filterable clearable>
            <el-option
              v-for="(item, index) in users"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/4 mt-3">
          <label>{{ $t("Date") }}</label>
          <el-date-picker
            class="mt-2"
            v-model="date"
            type="date"
            :placeholder="$t('Select')"
          >
          </el-date-picker>
        </div>

        <div class="vx-col sm:w-full md:w-full lg:w-1/4 mt-3">
          <label>{{ $t("FromTime") }}</label>

          <el-time-select
            class="mt-2"
            :placeholder="$t('Select')"
            v-model="startTime"
            :picker-options="{
              start: '00:00',
              step: '00:30',
              end: '23:00',
            }"
          >
          </el-time-select>
        </div>

        <div class="vx-col sm:w-full md:w-full lg:w-1/4 mt-3">
          <label>{{ $t("ToTime") }}</label>

          <el-time-select
            class="mt-2"
            :placeholder="$t('Select')"
            v-model="endTime"
            :picker-options="{
              start: '00:00',
              step: '00:30',
              end: '23:00',
              minTime: startTime,
            }"
          >
          </el-time-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button 

          type="primary" @click="saveData"
          >{{$t('Save')}}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: "appointments",
  data() {
    return {
      appointmentsModal: false,
      editMode: false,
      events: [],
      services: [],
      users: [],
      inputs: {
        services: [],
        user_id: "",
        start_time: "",
        finish_time: ""
      },
      date: null,
      startTime: null,
      endTime: null,
      id: null,
    };
  },
  methods: {
    addNew() {
      this.clearData();
      this.appointmentsModal = true;
    },
      openConfirm(id){
      let me= this;
      me.id= id;
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: this.$t('Delete'),
        text: this.$t('DeleteQuestion'),
        acceptText:this.$t('Accept'),
        cancelText: this.$t('Cancel'),
        accept: function () {
          me.removeData()
        },
    })
    },
    removeData() {
        this.$store.dispatch('appointments/removeData', parseInt(this.id)).then(res => {
          this.serviceModal= false;
            this.$vs.notify({
              title:this.$t('Deleted'),
              text: this.$t('DeletedSuccessfully'),
              color:'success',
              position: 'top-center',
              time:4000,
          })
          this.appointmentsModal = false;
          this.initData();
        })
    },
    
    saveData() {
      let dataToSend= this.inputs;
      dataToSend.id = parseInt(this.id);
      dataToSend.start_time= moment(this.date).format("YYYY-MM-DD") + ' ' + this.startTime;
      dataToSend.finish_time= moment(this.date).format("YYYY-MM-DD") + ' ' + this.endTime;
      if(this.editMode) {
        this.$store.dispatch("appointments/updateData", dataToSend).then(res => {
           this.$vs.notify({
              title:this.$t('Updated'),
              text: this.$t('UpdatedSuccessfully'),
              color:'success',
              position: 'top-center',
              time:4000,
          });
        this.appointmentsModal = false;
        this.initData();
      })
      .catch(err => {

      });
      }
      else {
        this.$store.dispatch("appointments/saveData", dataToSend).then(res => {
           this.$vs.notify({
              title:this.$t('Saved'),
              text: this.$t('SavedSuccessfully'),
              color:'success',
              position: 'top-center',
              time:4000,
          });
        this.appointmentsModal = false;
        this.initData();
      })
      .catch(err => {

      });
      }
    },
    clearData() {
      this.inputs = {
        services: [],
        user_id: "",
        start_time: "",
        finish_time: ""
      };
      this.date = null;
      this.startTime = null;
      this.endTime =null;
      this.id= null;
      this.editMode= false;
    },
    newEvent() {
          // console.log('new evebt')
    },
    renderEvent(arg) {
          // console.log('render event', arg)
    },
    updateEvent(arg) {
          // console.log('event=', arg.event);
    },
    handleSelect(arg) {
      this.addNew();
      if(arg.startStr.includes("T")) {
        this.date= moment(arg.startStr);
        this.startTime= arg.startStr.substring(11,16);
        this.endTime= arg.endStr.substring(11,16);
        }else {
        this.date= moment(arg.startStr);
      }
      
    },
    editData(arg) {
      this.addNew();
      this.editMode= true;
      this.id = arg.id;
      this.$store.dispatch("appointments/findData", arg.id).then((res) => {
         this.inputs = res.data;
         this.date= moment(res.data.start_time).format("YYYY-MM-DD");
         this.startTime= res.data.start_time.substring(11, 16)
         this.endTime= res.data.finish_time.substring(11, 16);
        let getServices = [];
        this.inputs.services.forEach(data => {
          getServices.push(data.id);
        });
        this.inputs.services = getServices;
        });
    },
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