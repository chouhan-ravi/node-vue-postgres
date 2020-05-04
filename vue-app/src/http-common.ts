import axios from "axios";

export default axios.create({
  baseURL: (process.env.API_URL || "http://localhost:3000")+"/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Basic "+ (process.env.BASIC_AUTH_KEY || "dGVzdDp0ZXN0") //test:test
  }
});