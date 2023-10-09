import axios from "axios"

const baseRequestURL = axios.create({
  baseURL: "https://planner.rdclr.ru/api/",
  headers: {
    post: { "Content-Type": "application/x-www-form-urlencoded" },
  },
})

baseRequestURL.interceptors.request.use(
  (config) => {
    config.flag === false
      ? config
      : (config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`)
    return config
  },
  (error) => Promise.reject(error)
)

export { baseRequestURL }
