<template lang="html">
  <div>
    <span class="h1"> {{$t('Users')}} </span>
     <vs-button color="primary" class="float-right mb-5" @click="addNew"
     >
      {{$t("AddNewUser")}}
    </vs-button>
    <vs-table id="usersTable"
    max-items="10" 
    pagination
    search 
     :noDataText="$t('NoData')"
     stripe :data="users">
      <template slot="thead">
        <vs-th sort-key="name">
          {{$t('Name')}}
        </vs-th>
        <vs-th sort-key="email">
          {{$t('Email')}}
        </vs-th>
        <vs-th sort-key="created_at">
          {{$t('CreatedAt')}}
        </vs-th>
		<vs-th>
          {{$t('Actions')}}
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr v-for="(tr, indextr) in data" :key="indextr">
          <vs-td :data="data[indextr].name">
            {{data[indextr].name}}
          </vs-td>

           <vs-td :data="data[indextr].email">
            {{data[indextr].email}}
          </vs-td>

          <vs-td :data="data[indextr].created_at">
            {{data[indextr].created_at}}
          </vs-td>
		  <vs-td>
           <feather-icon @click="editData(data[indextr])" icon="EditIcon" class="mr-2 cursor editIcon" />
		      <feather-icon @click="openConfirm(data[indextr].id)" icon="DeleteIcon" class="mr-2 cursor deleteIcon" />
          </vs-td>
        </vs-tr>
      </template>
	  
    </vs-table>

     <vs-popup
      class="holamundo"
      :title="$t('AddNewUser')"
      :active.sync="userModal"
    >
    <vs-input
      name="name"
      icon-no-border
      :label-placeholder="$t('Name')"
      v-model="inputs.name"
      class="w-full mt-6"
    />
     <vs-input
      name="email"
      icon-no-border
      :label-placeholder="$t('Email')"
      v-model="inputs.email"
      class="w-full mt-6"
    />
    <vs-button color="success" @click="saveData" class="float-right mt-3 mb-3">
      {{$t('Save')}}
    </vs-button>

    </vs-popup>
  </div>
</template>

<script>
export default {
  data() {
	return {
		users:[],
    userModal: false,
    inputs: {
      id: 0,
      name: '',
      email: ''
    }
	}
  },
  methods: {
	  initData() {
		     this.$store.dispatch("users/getData").then(res => {
				 this.users= res.data;
			 });
	  },
    addNew() {
      this.clearData();
      this.userModal=true;
    },
    clearData() {
      this.inputs = {
      id: 0,
      name: '',
      email: ''
    }
    },
    editData(row) {
      this.userModal= true;
      this.inputs = JSON.parse(JSON.stringify(row))
    },
    saveData() {
      if(this.inputs.id == 0) {
        this.$store.dispatch('users/saveData', this.inputs).then(res => {
          this.userModal= false;
            this.$vs.notify({
              title:this.$t('Saved'),
              text: this.$t('SavedSuccessfully'),
              color:'success',
              position: 'top-center',
              time:4000,
          })
          this.initData();
        })
      }
      else {
         this.$store.dispatch('users/updateData', this.inputs).then(res => {
          this.userModal= false;
            this.$vs.notify({
              title:this.$t('Updated'),
              text: this.$t('UpdatedSuccessfully'),
              color:'success',
              position: 'top-center',
              time:4000,
          })
          this.initData();
        })
      }
    },

    openConfirm(id){
      let me= this;
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: this.$t('Delete'),
        text: this.$t('DeleteQuestion'),
        acceptText:this.$t('Accept'),
        cancelText: this.$t('Cancel'),
        accept: function () {
          me.removeData(id)
        },
    })
    },
    removeData(id) {
        this.$store.dispatch('users/removeData', id).then(res => {
          this.userModal= false;
            this.$vs.notify({
              title:this.$t('Deleted'),
              text: this.$t('DeletedSuccessfully'),
              color:'success',
              position: 'top-center',
              time:4000,
          })
          this.initData();
        })
    }
    
  },
  
  created() {
	  this.initData();
  }
}
</script>

<style>
.vs-con-table .vs-con-tbody .vs-table--tbody-table .vs-table--thead th {
	background: rgb(17, 17, 51);
	color: #fff;
}
.cursor {
	cursor: pointer;
}
.editIcon:hover {
	color: green;
}
.deleteIcon:hover {
	color: red;
}
</style>