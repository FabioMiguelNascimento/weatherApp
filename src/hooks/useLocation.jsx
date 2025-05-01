import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const geoEndpoint = 'https://api.openweathermap.org/geo/1.0/direct?';
const reverseGeoEndpoint = 'https://api.openweathermap.org/geo/1.0/reverse?';
const currentWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather?';

export const fetchStatus = {
    loading: false,
    error: null
};

export async function getLocationByCity(city) {
    try {
        fetchStatus.loading = true;
        const response = await axios.get(`${geoEndpoint}q=${city}&limit=5&appid=${API_KEY}`);
        
        if (!response.data?.length) {
            throw new Error('Cidade não encontrada');
        }

        return [response.data[0]];
    } catch (error) {
        console.error("unexpected error: ", error);
        fetchStatus.error = error;
        return null;
    } finally {
        fetchStatus.loading = false;
    }
}

export async function getLocationByCoords(lat, lon) {
    try {
        fetchStatus.loading = true;
        const response = await axios.get(`${reverseGeoEndpoint}lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
        return response.data[0];
    } catch (error) {
        console.error("unexpected error: ", error);
        fetchStatus.error = error;
        return null;
    } finally {
        fetchStatus.loading = false;
    }
}

export async function getWeather(lat, long) {
    try {
        fetchStatus.loading = true;
        const response = await axios.get(
            `${currentWeatherEndpoint}lat=${lat}&lon=${long}&lang=pt_br&appid=${API_KEY}&units=metric`
        );
        return response.data;
    } catch (error) {
        console.error('Unexpected error: ', error);   
        fetchStatus.error = error;
        return null;     
    } finally {
        fetchStatus.loading = false;
    }
}