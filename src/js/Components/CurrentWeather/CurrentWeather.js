import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";
import { formatValue } from "../../../Services/constants";
import { checkProperty } from "../../../Services/constants";

export default class CurrentWeather extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("WEATHERDATA", this.updateMyself);
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    init() {
        // AppState.update("WEATHERDATA", {
        //     weatherData: this.props.weatherData
        // });
        this.state = {};
        this.updateMyself = this.updateMyself.bind(this);
    }

    render() {
        console.log(this.state);
        return this.state.hasOwnProperty("weatherData")
            ? [
                  {
                      tag: "div",
                      classList: ["forecast-current"],
                      children: [
                          {
                              tag: "div",
                              classList: ["city-name"],
                              content: checkProperty(
                                  this.state.weatherData.name
                              )
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
                                                  "forecast-item-text-pressure"
                                              ],
                                              content: `${checkProperty(
                                                  this.state.weatherData.main
                                                      .pressure
                                              )} mm mercury col.`
                                          },
                                          {
                                              tag: "div",
                                              classList: [
                                                  "forecast-item-text",
                                                  "forecast-item-text-humidity"
                                              ],
                                              content: `${checkProperty(
                                                  this.state.weatherData.main
                                                      .humidity
                                              )} %`,
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
                                                      content: `${formatValue(
                                                          this.state.weatherData
                                                              .main.temp_min
                                                      )}&deg;`
                                                  },
                                                  {
                                                      tag: "div",
                                                      classList: ["temp-max"],
                                                      content: `${formatValue(
                                                          this.state.weatherData
                                                              .main.temp_max
                                                      )}&deg;`
                                                  }
                                              ]
                                          },
                                          {
                                              tag: "div",
                                              classList: [
                                                  "forecast-item-tempcurrent"
                                              ],
                                              content: `${formatValue(
                                                  this.state.weatherData.main
                                                      .temp
                                              )}&deg;`
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
