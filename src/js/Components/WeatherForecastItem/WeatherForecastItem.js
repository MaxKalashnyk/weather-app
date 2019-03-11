import Component from "../../framework/Component";

export default class WeatherForecastItem extends Component {
    constructor(host, props) {
        super(host, props);
    }
    render() {
        return [
            {
                tag: "div",
                classList: ["forecast-nearest-day-item"],
                children: [
                    {
                        tag: "h3",
                        classList: ["day-title"],
                        content: "03/03"
                    },
                    {
                        tag: "div",
                        classList: ["day-forecast-icon"]
                    },
                    {
                        tag: "div",
                        classList: ["day-forecast-temp"],
                        content: "4&deg;"
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
