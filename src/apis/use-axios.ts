import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "/api",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

const service = new Http().instance;

export default service;
