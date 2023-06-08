import axios from 'axios'

const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
  params: {
    key: 'AIzaSyAjmIbqpCYTxaYMNxCTID9ZSiLbKHe1nkQ'
  }
})

export default authApi



