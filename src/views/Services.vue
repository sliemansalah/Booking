<template lang="html">
  <div>
    <span class="h1"> {{$t('Services')}} </span>
     <vs-button color="primary" class="float-right mb-5" @click="popupActive=true"
     >
      {{$t("AddNewService")}}
    </vs-button>
    <vs-table
     stripe :data="services">
      <template slot="thead">
        <vs-th>
          {{$t('Name')}}
        </vs-th>
        <vs-th>
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

          <vs-td :data="data[indextr].created_at">
            {{data[indextr].created_at}}
          </vs-td>
		  <vs-td>
           <feather-icon icon="EditIcon" class="mr-2 cursor editIcon" />
		   <feather-icon icon="DeleteIcon" class="mr-2 cursor deleteIcon" />
          </vs-td>
        </vs-tr>
      </template>
	  
    </vs-table>
  </div>
</template>

<script>
export default {
  data() {
	return {
		services:[]
	}
  },
  methods: {
	  initData() {
		     this.$store.dispatch("services/getData").then(res => {
				 this.services= res.data.resources;
			 });
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