import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";
import { formatValue } from "../../../Services/constants";
import { formatDateValue } from "../../../Services/constants";
import { generateIconClass } from "../../../Services/constants";

export default class WeatherForecastItem extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("WEATHERFORECASTDATA", this.updateMyself);
        AppState.watch("WEATHERDATA", this.updateMyself);
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.updateCurrentWeather = this.updateCurrentWeather.bind(this);
    }
    updateCurrentWeather() {
        // console.log(this.props);
        AppState.update("WEATHERDATA", {
            weatherData: this.props
        });
    }

    render() {
        // console.log(this.props);
        return [
            {
                tag: "div",
                classList: ["forecast-nearest-day-item"],
                children: [
                    {
                        tag: "h3",
                        classList: ["day-title"],
                        content: formatDateValue(this.props.dt_txt)
                    },
                    {
                        tag: "div",
                        classList: ["day-forecast-icon"]
                    },
                    {
                        tag: "div",
                        classList: ["day-forecast-temp"],
                        content: `${formatValue(this.props.main.temp)}&deg;`
                    },
                    {
                        tag: "div",
                        classList: [
                            "day-forecast-weather",
                            `${generateIconClass(this.props.weather[0].icon)}`
                        ]
                    }
                ],
                eventHandlers: {
                    click: this.updateCurrentWeather
                }
            }
        ];
    }
}
