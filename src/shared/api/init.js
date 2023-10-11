import axios from "axios"

const baseRequestURL = axios.create({
  baseURL: "https://planner.rdclr.ru/api/",
  headers: {
    post: { "Content-Type": "application/x-www-form-urlencoded" },
  },
})

baseRequestURL.interceptors.request.use(
  (config) => {
    if (config.flag === true) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`
    } else {
      return config
    }
    delete config.flag
    return config
  },
  (error) => Promise.reject(error)
)

export { baseRequestURL }
