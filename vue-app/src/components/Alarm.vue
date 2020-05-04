<template>
  <div v-if="currentAlarm" class="edit-form">
    <h4>Alert</h4>
    <router-link to="/alarms" tag="span" class="nav-item">
      <a href="#" class="nav-link">Back to list</a>
    </router-link>
    <form>
      <div class="form-group">
        <label for="companyId">Company Id</label>
        <input
          type="text"
          class="form-control"
          id="companyId"
          v-model="currentAlarm.companyId"
        />
      </div>

      <div class="form-group">
        <label for="stationId">Station Id</label>
        <input
          type="text"
          class="form-control"
          id="stationId"
          v-model="currentAlarm.stationId"
        />
      </div>

      <div class="form-group">
        <label for="cameraId">Camera Id</label>
        <input
          type="text"
          class="form-control"
          id="cameraId"
          v-model="currentAlarm.cameraId"
        />
      </div>

      <div class="form-group">
        <label for="timestamp">Date & Time</label>
        <input
          type="text"
          class="form-control"
          id="timestamp"
          v-model="currentAlarm.timestamp"
        />
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <input
          type="text"
          class="form-control"
          id="message"
          v-model="currentAlarm.message"
        />
      </div>

      <div class="form-group">
        <label><strong>State:</strong></label>
        {{ currentAlarm.state ? "Success" : "Pending" }}
      </div>
    </form>

    <button
      class="btn btn-primary mr-2"
      v-if="currentAlarm.state"
      @click="updateState(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="btn btn-primary mr-2"
      @click="updateState(true)"
    >
      Publish
    </button>

    <button class="btn btn-danger mr-2" @click="deleteAlarm">
      Delete
    </button>

    <button type="submit" class="btn btn-success" @click="updateAlarm">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Alarm...</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AlarmDataService from "../services/AlarmDataService";

@Component
export default class Alarm extends Vue {
  private currentAlarm: any = null;
  private message = "";

  getAlarm(id: string) {
    AlarmDataService.get(id)
      .then((response) => {
        this.currentAlarm = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateState(state: boolean) {
    const data = {
      id: this.currentAlarm.id,
      companyId: this.currentAlarm.companyId,
      stationId: this.currentAlarm.stationId,
      cameraId: this.currentAlarm.cameraId,
      message: this.currentAlarm.message,
      timestamp: this.currentAlarm.timestamp,
      state: state,
    };

    AlarmDataService.update(this.currentAlarm.id, data)
      .then((response) => {
        this.currentAlarm.state = state;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateAlarm() {
    AlarmDataService.update(this.currentAlarm.id, this.currentAlarm)
      .then((response) => {
        console.log(response.data);
        this.message = "The alert was updated successfully!";
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteAlarm() {
    AlarmDataService.delete(this.currentAlarm.id)
      .then((response) => {
        console.log(response.data);
        this.$router.push({ name: "alarms" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  mounted() {
    this.message = "";
    this.getAlarm(this.$route.params.id);
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 720px;
  margin: auto;
}
</style>