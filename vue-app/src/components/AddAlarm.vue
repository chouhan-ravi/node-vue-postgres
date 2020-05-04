<template>
  <div class="submit-form">
    <div class="col-md-12">
      <div class="page-header">
        <h3>Create New Alarm
          <small>
            <router-link to="/alarms" tag="a" class="label label-warning">
              Back to list
            </router-link>
          </small>
        </h3>  
      </div>
    </div>
    <div class="col-md-6 col-md-offset-2">
      <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li class="text-danger" v-for="(error,index) in errors" :key="index">{{ error }}</li>
      </ul>
    </p>
    </div>
    <div class="col-md-12" v-if="!submitted">
      <form class="form-horizontal" action="#" method="post">
      <div class="form-group">
        <label for="companyId" class="col-sm-2 control-label">Company Id</label>
        <div class="col-sm-6">
          <input
            type="number"
            class="form-control"
            id="companyId"
            required
            v-model="alarm.companyId"
            name="companyId"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="stationId" class="col-sm-2 control-label">Station Id</label>
        <div class="col-sm-6">
        <input
          type="number"
          class="form-control"
          id="stationId"
          required
          v-model="alarm.stationId"
          name="stationId"
        />
        </div>
      </div>

      <div class="form-group">
        <label for="cameraId" class="col-sm-2 control-label">Camera Id</label>
        <div class="col-sm-6">
        <input
          type="number"
          class="form-control"
          id="cameraId"
          required
          v-model="alarm.cameraId"
          name="cameraId"
        />
        </div>
      </div>

      <div class="form-group">
        <label for="timestamp" class="col-sm-2 control-label">Date & Time</label>
        <div class="col-sm-6">
        <input
          type="date"
          class="form-control"
          id="timestamp"
          required
          v-model="alarm.timestamp"
          name="timestamp"
        />
        </div>
      </div>

      <div class="form-group">
        <label for="message" class="col-sm-2 control-label">Message</label>
        <div class="col-sm-6">
        <input
          class="form-control"
          id="message"
          required
          v-model="alarm.message"
          name="message"
        />
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">State</label>
        <div class="col-sm-6">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" v-model="alarm.state" 
            value="false" id="exampleRadios1" checked>
            <label class="form-check-label" for="exampleRadios1">
              False State
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" v-model="alarm.state" 
            value="true" id="exampleRadios2">
            <label class="form-check-label" for="exampleRadios2">
              True State
            </label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-6 btn-group">
          <button type="button" class="btn btn-success" @click="saveAlarm">Submit</button>
          <button type="button" class="btn btn-warning" @click="OnSocketPushMessage">Push Message</button>
          <router-link to="/alarms" tag="button" class="btn btn-danger">
            Cancel
          </router-link>
        </div>
      </div>
      </form>
    </div>
    <div class="col-md-12" v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newAlarm">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AlarmDataService from "../services/AlarmDataService";

@Component
export default class AddAlarm extends Vue {
  private alarm: any = {
    id: null,
    companyId: "",
    stationId: "",
    cameraId: "",
    message: "",
    timestamp: "",
    state: "false",
  };
  private errors: Array<string> = [] ;

  private submitted = false;

  OnSocketPushMessage() {
    if(!this.validForm()) {
        return false;
    }
    this.$socket.emit('message', {
      companyId: this.alarm.companyId,
      stationId: this.alarm.stationId,
      cameraId: this.alarm.cameraId,
      message: this.alarm.message,
      timestamp: this.alarm.timestamp,
      state: this.alarm.state
    });
    this.$router.push({ name: "alarms" });
  }

  saveAlarm() {
    if(!this.validForm()) {
        return false;
    }
    const data = {
      companyId: this.alarm.companyId,
      stationId: this.alarm.stationId,
      cameraId: this.alarm.cameraId,
      message: this.alarm.message,
      timestamp: this.alarm.timestamp,
      state: this.alarm.state
    };

    AlarmDataService.create(data)
      .then((response) => {
        this.alarm.id = response.data.id;
        console.log(response.data);
        this.submitted = true;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  validForm() {
    this.errors = [];

    if (!this.alarm.companyId) {
      this.errors.push("Company Id required.");
    }
    if (!this.alarm.stationId) {
      this.errors.push('Station Id required.');
    } 
    if (!this.alarm.cameraId) {
      this.errors.push('CameraId required.');
    }
    if (!this.alarm.timestamp) {
      this.errors.push('Date & Time required.');
    }
    if (!this.alarm.message) {
      this.errors.push('Message required.');
    }
    if (!this.errors.length) {
      return true;
    }
    return false;
  }

  newAlarm() {
    this.submitted = false;
    this.alarm = {};
  }
}
</script>

<style scoped>
.submit-form {
  max-width: 720px;
  margin: auto;
}
</style>