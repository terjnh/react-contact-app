// This will be our Axios base file
import axios from 'axios';

export default axios.create({
    baseURL:"http://localhost:3006/"
})