import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";

export default class CurrentWeather extends Component {
    constructor(host, props) {
        super(host, props);
        this.updateMyself = this.updateMyself.bind(this);
        AppState.watch("CITY", this.updateMyself);
        AppState.watch("WEATHERDATA", this.updateMyself);
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    render() {
        console.log(this.state);
        return [
            {
                tag: "div",
                classList: ["forecast-current"],
                children: [
                    {
                        tag: "div",
                        classList: ["city-name"],
                        content: "Lisbon"
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
