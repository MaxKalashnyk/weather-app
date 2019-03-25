import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";
import { checkProperty } from "../../../Services/constants";
import { formatValue } from "../../../Services/constants";
import { formatDateValue } from "../../../Services/constants";

export default class WeatherForecastItem extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("WEATHERFORECASTDATA", this.updateMyself);
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
    }

    render() {
        console.log(this.props);
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
                            "day-forecast-weather-sunny"
                        ]
                    }
                ]
            }
        ];
    }
}
