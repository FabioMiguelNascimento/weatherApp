import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY
const geoEndpoint = 'http://api.openweathermap.org/geo/1.0/direct?'
const currentWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather?'

export const fetchStatus = {
    loading: false,
    error: null
};

export async function getLocationByCity(city) {
    try {
        fetchStatus.loading = true;
        const response = await axios.get(`${geoEndpoint}q=${city}&appid=${API_KEY}`)
        return response.data
    } catch (error) {
        console.error("unexpected error: ", error)
        fetchStatus.error = error;
        return null
    } finally {
        fetchStatus.loading = false;
    }
}

export async function getWeather(lat,long) {
    try {
        fetchStatus.loading = true;
        const response = await axios.get(`${currentWeatherEndpoint}lat=${lat}&lon=${long}&lang=pt_br&appid=${API_KEY}&units=metric`)
        return response.data
    } catch (error) {
        console.error('Unexpected error: ', error)   
        fetchStatus.error = error;
        return null     
    } finally {
        fetchStatus.loading = false;
    }
}