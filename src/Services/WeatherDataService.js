import { apiKey } from "./constants";

class WeatherDataService {
    // constructor() {
    //     this.urlsArray = [currentWeaterURLString, weatherForecastURLString];
    //     this.getWeather = this.getWeather.bind(this);
    // }

    getWeatherURLS(url, city) {
        return `${url}${city}&appid=${apiKey}&units=metric`;
    }

    // getData(url) {
    //     return fetch(url).then(res => {x
    //         if (res.ok) {
    //             return res.json();
    //         }

    //         throw new Error(res.statusText);
    //     });
    // }

    // getWeather(currentWeatherURL, dayForecastURL) {
    //     return Promise.all([
    //         WeatherDataService.getWeatherForecast(
    //             currentWeatherURL,
    //             this.props.city
    //         ),
    //         WeatherDataService.getWeatherForecast(
    //             dayForecastURL,
    //             this.props.city
    //         )
    //     ])

    //         .then(responses => Promise.all(responses.map(res => res.json())))
    //         .then(texts => {
    //             console.log(texts);
    //         });
    // }

    getWeather(urls, callback) {
        return Promise.all(urls.map(u => fetch(u)))
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(result => {
                // console.log(result);
                callback(result);
            });
    }

    // subscribeForCurrentWeather(callback) {

    // }
}

export default new WeatherDataService();
