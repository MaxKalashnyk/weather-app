import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";
import WeatherDataService from "../../../Services/WeatherDataService";
import { currentWeaterURLString } from "../../../Services/constants";
import { weatherForecastURLString } from "../../../Services/constants";
import { putItemToLocalStorage } from "../../../Services/constants";

export default class SearchHistory extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("RECENTLYVIEWEDPLACES", this.updateMyself);
        AppState.watch("WEATHERDATA", this.updateMyself);
    }
    updateMyself(substate) {
        this.updateState(substate);
    }

    init() {
        const storageRecentlyViewedList = localStorage.getItem(
            "recentlyViewedPlaces"
        )
            ? JSON.parse(localStorage.getItem("recentlyViewedPlaces"))
            : [];

        this.state = {
            storageRecentlyViewedList: storageRecentlyViewedList
        };

        [
            "updateMyself",
            "clearSearchHistoryList",
            "getWeatherByPlaceItem",
            "handleForecastData",
            "getWeatherData"
        ].forEach(
            methodName => (this[methodName] = this[methodName].bind(this))
        );
    }

    clearSearchHistoryList() {
        this.state.storageRecentlyViewedList = [];

        AppState.update("RECENTLYVIEWEDPLACES", {
            storageRecentlyViewedList: []
        });

        putItemToLocalStorage(
            "recentlyViewedPlaces",
            this.state.storageRecentlyViewedList
        );
    }

    getWeatherByPlaceItem({ target }) {
        if (event.target.classList.contains("user-activity-list-item")) {
            this.props.itemDataName = target.dataset.name;
            this.props.placeId = target.dataset.placeid;

            if (!this.state.weatherData) {
                this.getWeatherData(this.props.itemDataName);
            } else {
                if (this.state.weatherData.placeId !== this.props.placeId) {
                    this.getWeatherData(this.props.itemDataName);
                } else {
                    return;
                }
            }
        }
    }

    getWeatherData(cityName) {
        const urlsArray = [
            WeatherDataService.getWeatherURLS(currentWeaterURLString, cityName),
            WeatherDataService.getWeatherURLS(
                weatherForecastURLString,
                cityName
            )
        ];

        WeatherDataService.getWeather(urlsArray, this.handleForecastData);
    }

    handleForecastData(data) {
        if (data && data.length > 0) {
            this.props.weatherData = {
                ...data[0],
                placeId: this.props.placeId
            };
            this.props.weatherForecastData = data[1];
            AppState.update("WEATHERDATA", {
                weatherData: this.props.weatherData
            });
            AppState.update("WEATHERFORECASTDATA", {
                weatherForecastData: this.props.weatherForecastData
            });
            console.log(this.state);
        }
    }

    render() {
        return [
            {
                tag: "div",
                classList: ["user-activity-item"],
                children: [
                    {
                        tag: "div",
                        classList: ["user-activity-header"],
                        children: [
                            {
                                tag: "h3",
                                classList: [
                                    "user-activity-title",
                                    "user-activity-title-history"
                                ],
                                content: "recently viewed"
                            },
                            {
                                tag: "button",
                                classList: [
                                    "remove-button",
                                    "remove-button-history"
                                ],
                                eventHandlers: {
                                    click: this.clearSearchHistoryList
                                }
                            }
                        ]
                    },
                    {
                        tag: "div",
                        classList: ["user-activity-content"],
                        children: [
                            {
                                tag: "ul",
                                classList: ["user-activity-list"],
                                children: this.state.storageRecentlyViewedList.map(
                                    placeItem => {
                                        return {
                                            tag: "li",
                                            classList: [
                                                "user-activity-list-item"
                                            ],
                                            content:
                                                placeItem.formattedPlace ||
                                                placeItem.name,
                                            attributes: [
                                                {
                                                    name: "data-name",
                                                    value:
                                                        placeItem.place ||
                                                        placeItem.name
                                                },
                                                {
                                                    name: "data-placeid",
                                                    value: placeItem.placeId
                                                }
                                            ]
                                        };
                                    }
                                ),
                                eventHandlers: {
                                    click: this.getWeatherByPlaceItem
                                }
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
