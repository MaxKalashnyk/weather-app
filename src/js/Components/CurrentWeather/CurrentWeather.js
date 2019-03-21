import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";

export default class CurrentWeather extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("WEATHERDATA", this.updateMyself);
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    handleSmth() {
        console.log(this.state.weatherData);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.state = {
            weatherData: {
                coord: {
                    lon: 30.52,
                    lat: 50.43
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n"
                    }
                ],
                base: "stations",
                main: {
                    temp: 3.22,
                    pressure: 1029,
                    humidity: 55,
                    temp_min: 2,
                    temp_max: 4.44
                },
                visibility: 10000,
                wind: {
                    speed: 2,
                    deg: 270
                },
                clouds: {
                    all: 0
                },
                dt: 1553119791,
                sys: {
                    type: 1,
                    id: 8903,
                    message: 0.0034,
                    country: "UA",
                    sunrise: 1553140774,
                    sunset: 1553184652
                },
                id: 703448,
                name: "Kiev",
                cod: 200
            }
        };
    }

    render() {
        console.log(this.state.weatherData);
        return this.state.weatherData !== undefined
            ? [
                  {
                      tag: "div",
                      classList: ["forecast-current"],
                      children: [
                          {
                              tag: "div",
                              classList: ["city-name"],
                              content: this.state.weatherData
                                  ? this.state.weatherData.name
                                  : "Kyiv"
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
                                                      classList: [
                                                          "humidity-icon"
                                                      ]
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
                                              classList: [
                                                  "weather-icon-current"
                                              ],
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
                                              classList: [
                                                  "forecast-item-temps"
                                              ],
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
              ]
            : "";
    }
}
