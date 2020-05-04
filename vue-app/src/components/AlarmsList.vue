<template>
  <div class="raw">
    <div class="col-md-12">
      <div class="page-header">
        <h3>Alarm List</h3>
      </div>
    </div>
    <div class="col-md-4">
      <div class="input-group">
        <input type="text" class="form-control" v-model="search" @change="searchAlarm" placeholder="Search for...">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" @click="searchAlarm">Go!</button>
        </span>
      </div>
    </div>
    <div class="col-md-2">
      <div class="form-group">
        <button class="form-control btn btn-danger" @click="removeAllAlarms">Remove All</button>
      </div>
    </div>
    <div class="col-md-2 pull-right">
      <div class="form-group">
        <router-link to="/add-alarm" tag="button" class="form-control btn btn-success">
          Create
        </router-link>
      </div>
    </div>
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Company Id</th>
              <th>Station Id</th>
              <th>Camera Id</th>
              <th>Message</th>
              <th>Date & Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr :class="{ success: alarm.state, active: !alarm.state }"
            v-for="(alarm, index) in alarms"
            :key="index"
            @click="setActiveAlarm(alarm, index)">
              <th scope="row">{{(index+1)}}</th>
              <td>{{alarm.companyId}}</td>
              <td>{{alarm.stationId}}</td>
              <td>{{alarm.cameraId}}</td>
              <td>{{alarm.message}}</td>
              <td>{{alarm.timestamp}}</td>
              <td>
                <a class="label label-info" :href="'/alarms/' + alarm.id">Edit</a>
                <a class="label label-danger" @click="deleteAlarm(alarm.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AlarmDataService from "../services/AlarmDataService";

@Component({})
export default class AlarmsList extends Vue {
  private alarms: any[] = [];
  private currentAlarm: any = null;
  private currentIndex = -1;
  private search = "";

  retrieveAlarms() {
    AlarmDataService.getAll()
      .then((response) => {
        this.alarms = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAlarms();
    this.currentAlarm = null;
    this.currentIndex = -1;
  }

  setActive(alarm: any, index: number) {
    this.currentAlarm = alarm;
    this.currentIndex = index;
  }

  removeAllAlarms() {
    AlarmDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteAlarm(id: string) {
    AlarmDataService.delete(id)
      .then((response) => {
        console.log(response.data);
        this.retrieveAlarms();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchAlarm() {
    AlarmDataService.findBySearch(this.search)
      .then((response) => {
        this.alarms = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  mounted() {
    this.retrieveAlarms();
  }
}
</script>

<style scoped>
body {
  padding-top: 70px;
}
</style>