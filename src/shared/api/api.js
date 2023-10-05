import { baseRequestURL } from "./init"

const event = {
  list: () => baseRequestURL.get("events?populate=*&"),
}

const user = {
  login: (data) => baseRequestURL.post("auth/local", data),
  register: (data) => baseRequestURL.post("auth/local/register", data),
}

const check = {
  email: (email, data) => baseRequestURL.get(`/taken-emails/${email}`, data),
}

export const api = { event, user, check }
