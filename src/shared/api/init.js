import axios from "axios"

const getBearerToken = async () => {
  return await axios
    .post("https://planner.rdclr.ru/api/auth/local", {
      identifier: "user1",
      password: "passuser1",
    })
    .then((res) => localStorage.setItem("access_token", res.data.jwt))
    .catch((err) => console.log(err.response.data.error))
}

if (!localStorage.getItem("access_token")) getBearerToken()

const baseRequestURL = axios.create({
  baseURL: "https://planner.rdclr.ru/api/",
  headers: {
    post: { "Content-Type": "application/x-www-form-urlencoded" },
  },
})

baseRequestURL.interceptors.request.use(
  (config) => {
    !config.flag
      ? config
      : (config.headers.Authorization = `Bearer ${localStorage.getItem(
          "access_token"
        )}`)
    return config
  },
  (error) => Promise.reject(error)
)

export { baseRequestURL }
