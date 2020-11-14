import Axios from 'axios'

const URL = 'http://localhost:3000';

const axios = Axios.create({
    baseURL: URL
  });

export default axios