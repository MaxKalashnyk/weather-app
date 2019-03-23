import Component from "../../framework/Component";
import { initAutocomplete } from "../../../Services/constants";
import AppState from "../../../Services/AppState";
import WeatherDataService from "../../../Services/WeatherDataService";

export default class Searchbar extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("WEATHERDATA", this.updateMyself);
    }

    init() {
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.setAttribute("placeholder", "Location");
        this.input.setAttribute("required", "");
        this.input.setAttribute("autofocus", "");
        this.input.classList.add("main-search-input");

        this.updateMyself = this.updateMyself.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // this.state = {};
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    handleSmth() {
        initAutocomplete(this.input, this.handleSubmit);
    }

    handleSubmit(place) {
        this.props.city = place.name;
        this.getWeather();
    }

    getWeather() {
        WeatherDataService.getCurrentWeather(this.props.city).then(data => {
            this.props.weatherData = data;
            AppState.update("WEATHERDATA", {
                weatherData: this.props.weatherData
            });
        });
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
