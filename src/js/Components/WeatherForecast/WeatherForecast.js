import WeatherDataService from "../../../Services/WeatherDataService";

import Component from "../../framework/Component";
import WeatherForecastItem from "../../Components/WeatherForecastItem/WeatherForecastItem";

export default class WeatherForecast extends Component {
    constructor(host, props) {
        super(host, props);
    }
    render() {
        return [
            {
                tag: "div",
                classList: ["forecast-nearest-days"],
                children: [
                    {
                        tag: WeatherForecastItem
                    }
                ]
            }
        ];
    }
}
