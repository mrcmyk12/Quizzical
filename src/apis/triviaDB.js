import axios from "axios";

export default axios.create({
   baseUrl: 'https://opentdb.com/api.php?amount=5'
})