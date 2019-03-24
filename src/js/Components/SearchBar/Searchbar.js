import Component from "../../framework/Component";
import { initAutocomplete } from "../../../Services/constants";
import { currentWeaterURLString } from "../../../Services/constants";
import { weatherForecastURLString } from "../../../Services/constants";
import AppState from "../../../Services/AppState";
import WeatherDataService from "../../../Services/WeatherDataService";

export default class Searchbar extends Component {
    constructor(host, props) {
        super(host, props);
        this.urlsArray = [];
    }

    init() {
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.setAttribute("placeholder", "Location");
        this.input.setAttribute("required", "");
        this.input.setAttribute("autofocus", "");
        this.input.classList.add("main-search-input");

        this.updateMyself = this.updateMyself.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleForecastData = this.handleForecastData.bind(this);
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    handleSmth() {
        initAutocomplete(this.input, this.handleSubmit);
    }

    handleSubmit(place) {
        this.props.city = place.name;

        this.urlsArray = [
            WeatherDataService.getWeatherURLS(
                currentWeaterURLString,
                this.props.city
            ),
            WeatherDataService.getWeatherURLS(
                weatherForecastURLString,
                this.props.city
            )
        ];

        WeatherDataService.getWeather(this.urlsArray, this.handleForecastData);
    }

    handleForecastData(data) {
        if (data && data.length > 0) {
            this.props.weatherData = data[0];
            this.props.weatherForecastData = data[1];
            AppState.update("WEATHERDATA", {
                weatherData: this.props.weatherData
            });
            AppState.update("WEATHERFORECASTDATA", {
                weatherForecastData: this.props.weatherForecastData
            });
        }
    }

    render() {
        return [
            {
                tag: "div",
                content: "",
                classList: ["search-block"],
                children: [
                    {
                        tag: "button",
                        classList: ["add-to-favourite"]
                    },
                    this.input,
                    {
                        tag: "select",
                        classList: ["temperature-units"],
                        children: [
                            {
                                tag: "option",
                                attributes: [
                                    {
                                        name: "value",
                                        value: "Celsius"
                                    }
                                ],
                                content: "°C"
                            },
                            {
                                tag: "option",
                                attributes: [
                                    {
                                        name: "value",
                                        value: "Farengheit"
                                    }
                                ],
                                content: "°F"
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
