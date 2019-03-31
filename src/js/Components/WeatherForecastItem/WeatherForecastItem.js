import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";
import { formatValue } from "../../../Services/constants";
import { formatDateValue } from "../../../Services/constants";
import { generateIconClass } from "../../../Services/constants";
import { getDayFromDateString } from "../../../Services/constants";
import { convertTemperatureUnits } from "../../../Services/constants";

export default class WeatherForecastItem extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("WEATHERFORECASTDATA", this.updateMyself);
        AppState.watch("WEATHERDATA", this.updateMyself);
        AppState.watch("UNITSCHECK", this.updateMyself);
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    init() {
        this.state = {};
        this.updateMyself = this.updateMyself.bind(this);
        this.updateCurrentWeather = this.updateCurrentWeather.bind(this);
    }
    updateCurrentWeather() {
        // console.log(this.props);

        const objectToUpdate = {
            dt: this.props.dt,
            wind: this.props.wind,
            main: this.props.main,
            weather: this.props.weather
        };

        const finalObj = Object.assign(this.props, objectToUpdate);

        // console.log(finalObj);

        AppState.update("WEATHERDATA", {
            weatherData: finalObj
        });

        if (this.state.hasOwnProperty("isMetricUnits")) {
            AppState.update("UNITSCHECK", {
                isMetricUnits: this.state.isMetricUnits
            });
        }
    }

    render() {
        // console.log(this.state.isMetricUnits);
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
                        classList: ["day-forecast-dayname"],
                        content: getDayFromDateString(this.props.dt, "short")
                    },
                    {
                        tag: "div",
                        classList: ["day-forecast-temp"],
                        content: this.state.hasOwnProperty("isMetricUnits")
                            ? !this.state.isMetricUnits
                                ? `${convertTemperatureUnits(
                                      this.props.main.temp
                                  )}&deg;F`
                                : `${formatValue(this.props.main.temp)}&deg;C`
                            : `${formatValue(this.props.main.temp)}&deg;C`
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
