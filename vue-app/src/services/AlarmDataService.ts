import http from "../http-common";

class AlarmDataService {
  getAll() {
    return http.get("/alarms");
  }

  get(id: string) {
    return http.get(`/alarms/${id}`);
  }

  create(data: any) {
    return http.post("/alarms", data);
  }

  update(id: string, data: any) {
    return http.put(`/alarms/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/alarms/${id}`);
  }

  deleteAll() {
    return http.delete(`/alarms`);
  }

  findBySearch(search: string) {
    return http.get(`/alarms?q=${search}`);
  }
}

export default new AlarmDataService();