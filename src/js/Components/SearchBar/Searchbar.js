import Component from "../../framework/Component";
import { initAutocomplete } from "../../../Services/constants";
import AppState from "../../../Services/AppState";
import WeatherDataService from "../../../Services/WeatherDataService";

export default class Searchbar extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("WEATHERDATA", this.getWeather);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    handleSmth() {
        const input = document.querySelector(".main-search-input");
        initAutocomplete(input, this.handleSubmit);
    }

    handleSubmit(place) {
        this.props.city = place.name;
        AppState.update("WEATHERDATA", {
            weatherData: this.props.weatherData
        });
    }

    getWeather() {
        WeatherDataService.getCurrentWeather(this.props.city).then(data => {
            this.onServerResponse(data);
            console.log(this.props);
            this.updateState(this.props);
        });
    }

    onServerResponse(weatherData) {
        this.props.weatherData = weatherData;
        return this.props.weatherData;
        // this._render();
    }

    // bindEverything() {
    //     this.getWeather();
    // }

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
                    {
                        tag: "input",
                        classList: ["main-search-input"],
                        attributes: [
                            {
                                name: "type",
                                value: "text"
                            },
                            {
                                name: "placeholder",
                                value: "Location"
                            }
                        ]
                    },
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
