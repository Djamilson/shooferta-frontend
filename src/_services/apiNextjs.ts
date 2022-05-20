import axios from 'axios'

export const apiNextjs = axios.create({
    baseURL: '/api'
})
