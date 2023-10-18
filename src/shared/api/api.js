import { baseRequestURL } from './init'

const event = {
    list: (options) => baseRequestURL.get('events?populate=*&', options),
    join: (id, data, options) => baseRequestURL.post(`/events/${id}/join`, data, options),
    create: (data, options) => baseRequestURL.post(`/events`, data, options),
}

const user = {
    login: (data, options) => baseRequestURL.post('auth/local', data, options),
    register: (data, options) => baseRequestURL.post('auth/local/register', data, options),
    me: (options) => baseRequestURL.get('/users/me', options),
    all: (options) => baseRequestURL.get('/users', options),
}

const uploads = {
    get: (options) => baseRequestURL.get('/upload/files', options),
    post: (data, options) => baseRequestURL.post('/upload', data, options),
}

const check = {
    email: (email, options) => baseRequestURL.get(`/taken-emails/${email}`, options),
}

export const api = { event, user, check, uploads }
