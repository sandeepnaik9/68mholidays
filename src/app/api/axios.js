import axios from "axios";

export default axios.create({
    baseUrl:process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_BASE_URL
})