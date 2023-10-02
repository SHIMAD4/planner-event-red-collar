import { baseRequestURL } from "./init"

const event = {
  list: () => baseRequestURL.get("events"),
}

// const user = {
//   register: (data) => baseRequestURL.post("auth/local/register", data),
// }

export const api = { event }
