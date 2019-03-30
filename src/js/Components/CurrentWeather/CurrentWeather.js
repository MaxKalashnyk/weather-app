import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";
import { formatValue } from "../../../Services/constants";
import { checkProperty } from "../../../Services/constants";
// import { getCurrentDate } from "../../../Services/constants";
import { getcurrentDateString } from "../../../Services/constants";
import { getDayFromDateString } from "../../../Services/constants";
import { convertPressure } from "../../../Services/constants";
import { defineWindDirection } from "../../../Services/constants";
import { generateIconClass } from "../../../Services/constants";

export default class CurrentWeather extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("WEATHERDATA", this.updateMyself);
        console.log(this.state);
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    init() {
        // console.log(this.state);
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
                                              content: getDayFromDateString(
                                                  this.state.weatherData.dt
                                              )
                                          },
                                          {
                                              tag: "div",
                                              classList: [
                                                  "forecast-item-text",
                                                  "forecast-item-text-icon",
                                                  "forecast-item-text-icon-date"
                                              ],
                                              content: getcurrentDateString(
                                                  this.state.weatherData.dt
                                              )
                                          },
                                          {
                                              tag: "div",
                                              classList: [
                                                  "forecast-item-text",
                                                  "forecast-item-text-icon",
                                                  "forecast-item-text-icon-pressure"
                                              ],
                                              content: `${convertPressure(
                                                  this.state.weatherData.main.hasOwnProperty(
                                                      "pressure"
                                                  )
                                                      ? this.state.weatherData
                                                            .main.pressure
                                                      : ""
                                              )} mm Hg`
                                          },
                                          {
                                              tag: "div",
                                              classList: [
                                                  "forecast-item-text",
                                                  "forecast-item-text-icon",
                                                  "forecast-item-text-icon-wind"
                                              ],
                                              content: `${checkProperty(
                                                  this.state.weatherData.wind
                                                      .speed
                                              )} m/s, ${defineWindDirection(
                                                  this.state.weatherData.wind
                                                      .deg
                                              )}`,
                                              children: [
                                                  {
                                                      tag: "span",
                                                      classList: [
                                                          "humidity-icon"
                                                      ]
                                                  }
                                              ]
                                          },
                                          {
                                              tag: "div",
                                              classList: [
                                                  "forecast-item-text",
                                                  "forecast-item-text-icon",
                                                  "forecast-item-text-icon-humidity"
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
                                                  "weather-icon-current",
                                                  `${generateIconClass(
                                                      this.state.weatherData
                                                          .weather[0].icon
                                                  )}`
                                              ]
                                          },
                                          {
                                              tag: "div",
                                              classList: [
                                                  "weather-icon-description"
                                              ],
                                              content: `${checkProperty(
                                                  this.state.weatherData
                                                      .weather[0].description
                                              )}`
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
