import axios from 'axios';

const params = new URLSearchParams();

export async function getCities(city) {
    params.append('name', city);
    console.log(city);
    try {
        return await axios.get(`http://localhost:3000?city=${city}`);
    } catch (e) {
        console.log(e);
    }
}