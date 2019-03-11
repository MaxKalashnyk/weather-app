import WeatherDataService from "../../../Services/WeatherDataService";
import Component from "../../framework/Component";

export default class CurrentWeather extends Component {
    constructor(host, props) {
        super(host, props);
        this.props = {};
        // this.onServerResponse = this.onServerResponse.bind(this);
        // this.getWeather = this.getWeather.bind(this);
        // WeatherDataService.subscribeForCurrentWeather(this.onServerResponse);
    }

    onServerResponse(weatherData) {
        this.props.weatherData = weatherData;
        return this.props;
        // this._render();
    }

    getWeather() {
        WeatherDataService.getCurrentWeather().then(data => {
            // console.log(data);
            // console.log(typeof this.onServerResponse);

            this.onServerResponse(data);
            console.log(this.props);
        });
    }

    bindEverything() {
        this.getWeather();
    }

    render() {
        console.log(this.props);
        return [
            {
                tag: "div",
                classList: ["forecast-current"],
                children: [
                    {
                        tag: "div",
                        classList: ["city-name"],
                        content: "Lisbon",
                        eventHandlers: [
                            {
                                eventType: "click",
                                handler: this.getWeather.bind(this)
                            }
                        ]
                    },
                    {
                        tag: "div",
                        classList: ["forecast-details"],
                        children: [
                            {
                                tag: "div",
                                classList: ["forecast-item"],
                                children: [
                                    {
                                        tag: "div",
                                        classList: [
                                            "forecast-item-text",
                                            "forecast-item-text-day"
                                        ],
                                        content: "Saturday"
                                    },
                                    {
                                        tag: "div",
                                        classList: [
                                            "forecast-item-text",
                                            "forecast-item-text-date"
                                        ],
                                        content: "02/03/2019"
                                    },
                                    {
                                        tag: "div",
                                        classList: [
                                            "forecast-item-text",
                                            "forecast-item-text-wind"
                                        ],
                                        content: "5 m/s"
                                    },
                                    {
                                        tag: "div",
                                        classList: [
                                            "forecast-item-text",
                                            "forecast-item-text-humidity"
                                        ],
                                        content: "55%",
                                        children: [
                                            {
                                                tag: "span",
                                                classList: ["humidity-icon"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                classList: ["forecast-item"],
                                children: [
                                    {
                                        tag: "div",
                                        classList: ["weather-icon-current"],
                                        content: "Sunny"
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                classList: ["forecast-item"],
                                children: [
                                    {
                                        tag: "div",
                                        classList: ["forecast-item-temps"],
                                        children: [
                                            {
                                                tag: "div",
                                                classList: ["temp-min"],
                                                content: "-3&deg;"
                                            },
                                            {
                                                tag: "div",
                                                classList: ["temp-max"],
                                                content: "10&deg;"
                                            }
                                        ]
                                    },
                                    {
                                        tag: "div",
                                        classList: [
                                            "forecast-item-tempcurrent"
                                        ],
                                        content: "3&deg;"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
