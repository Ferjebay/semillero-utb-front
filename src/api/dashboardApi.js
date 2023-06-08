 
import axios from 'axios'

const dashboardApi = axios.create({
    baseURL: 'https://esp-iot-app-df933-default-rtdb.firebaseio.com'
})

// journalApi.interceptors.request.use( (config) => {
//     config.params = {
//         auth: localStorage.getItem('idToken')
//     }

//     return config
// })

export default dashboardApi

