import { currentWeaterURLString } from "./constants";
import { weatherForecastURLString } from "./constants";
import { apiKey } from "./constants";

class WeatherDataService {
    constructor() {
        // this.subscribeForCurrentWeather = this.subscribeForCurrentWeather.bind(
        //     this
        // );
    }

    getCurrentWeather(city = "Kiev", units = "metric") {
        const currentWeatherUrl = `${currentWeaterURLString}${city}&appid=${apiKey}&units=${units}`;
        return this.getData(currentWeatherUrl);
    }
    getWeatherForecast(city = "Kiev", units = "metric") {
        const weatherForecastUrl = `${weatherForecastURLString}${city}&appid=${apiKey}&units=${units}`;
        return this.getData(weatherForecastUrl);
    }

    getData(url) {
        return fetch(url).then(res => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(res.statusText);
        });
    }

    subscribeForCurrentWeather(callback) {
        // const resp = this.getCurrentWeather();
        // console.log(resp);
        // callback();
        // console.log("subscribed");
    }
}

export default new WeatherDataService();
