import Component from "../../framework/Component";
import { initAutocomplete } from "../../../Services/constants";
import { currentWeaterURLString } from "../../../Services/constants";
import { weatherForecastURLString } from "../../../Services/constants";
import AppState from "../../../Services/AppState";
import WeatherDataService from "../../../Services/WeatherDataService";

export default class Searchbar extends Component {
    constructor(host, props) {
        super(host, props);
        this.urlsArray = [];
        this.recentlyViewedPlacesArray = [];
        this.favouritePlacesArray = [];
        this.isFavouriteCheck = false;
        AppState.watch("FAVOURITEPLACECHECK", this.updateMyself);
        AppState.watch("FAVOURITEPLACES", this.updateMyself);
    }

    init() {
        this.state = {};
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.setAttribute("placeholder", "Location");
        this.input.setAttribute("required", "");
        this.input.setAttribute("autofocus", "");
        this.input.classList.add("main-search-input");

        [
            "updateMyself",
            "handleSubmit",
            "handleForecastData",
            "handleFavouritePlace",
            "checkItemAndPushToArray"
        ].forEach(
            methodName => (this[methodName] = this[methodName].bind(this))
        );
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    handleSmth() {
        initAutocomplete(this.input, this.handleSubmit);
    }

    handleSubmit(place) {
        // console.log(place);
        this.isFavouriteCheck = false;
        AppState.update("FAVOURITEPLACECHECK", {
            favouritePlaceCheck: this.isFavouriteCheck
        });
        this.props.city = place.name;
        this.props.cityFormatted = place.formatted_address;
        this.props.placeId = place.id;

        this.checkItemAndPushToArray(this.recentlyViewedPlacesArray);

        this.checkFavouritePlace();

        this.urlsArray = [
            WeatherDataService.getWeatherURLS(
                currentWeaterURLString,
                this.props.city
            ),
            WeatherDataService.getWeatherURLS(
                weatherForecastURLString,
                this.props.city
            )
        ];

        WeatherDataService.getWeather(this.urlsArray, this.handleForecastData);
    }

    checkItemAndPushToArray(array, isFavourite = false) {
        // console.log(array);

        if (
            array.filter(item => item.placeId === this.props.placeId).length ===
            0
        ) {
            const placeObject = {
                place: this.props.city,
                formattedPlace: this.props.cityFormatted,
                placeId: this.props.placeId
            };
            array.push(placeObject);
            if (isFavourite) {
                this.isFavouriteCheck = true;
            }
        } else {
            if (isFavourite) {
                this.isFavouriteCheck = false;
                this.favouritePlacesArray = this.favouritePlacesArray.filter(
                    item => {
                        return item.placeId !== this.props.placeId;
                    }
                );
            }
        }
    }

    checkFavouritePlace() {
        const matchedItem = this.favouritePlacesArray.find(item => {
            return item.placeId === this.props.placeId;
        });

        if (matchedItem !== undefined) {
            this.isFavouriteCheck = true;
            AppState.update("FAVOURITEPLACECHECK", {
                favouritePlaceCheck: this.isFavouriteCheck
            });
        } else {
            this.isFavouriteCheck = false;
        }
    }

    handleForecastData(data) {
        if (data && data.length > 0) {
            this.props.weatherData = data[0];
            this.props.weatherForecastData = data[1];
            AppState.update("WEATHERDATA", {
                weatherData: this.props.weatherData
            });
            AppState.update("WEATHERFORECASTDATA", {
                weatherForecastData: this.props.weatherForecastData
            });
            AppState.update("RECENTLYVIEWEDPLACES", {
                recentlyViewedPlaces: this.recentlyViewedPlacesArray
            });
        }
    }

    handleFavouritePlace() {
        this.checkItemAndPushToArray(this.favouritePlacesArray, true);
        // console.log(this.favouritePlacesArray);
        AppState.update("FAVOURITEPLACECHECK", {
            favouritePlaceCheck: this.isFavouriteCheck
        });
        AppState.update("FAVOURITEPLACES", {
            favouritePlaces: this.favouritePlacesArray
        });
    }

    render() {
        let activeButtonClass;

        if (this.state.hasOwnProperty("favouritePlaceCheck")) {
            if (this.state.favouritePlaceCheck) {
                activeButtonClass = "add-to-favourite-active";
            } else {
                activeButtonClass = "button";
            }
        }

        return [
            {
                tag: "div",
                content: "",
                classList: ["search-block"],
                children: [
                    {
                        tag: "button",
                        classList: [
                            "add-to-favourite",
                            `${
                                activeButtonClass ? activeButtonClass : "button"
                            }`
                        ],
                        eventHandlers: {
                            click: this.handleFavouritePlace
                        }
                    },
                    this.input,
                    {
                        tag: "select",
                        classList: ["temperature-units"],
                        children: [
                            {
                                tag: "option",
                                attributes: [
                                    {
                                        name: "value",
                                        value: "Celsius"
                                    }
                                ],
                                content: "°C"
                            },
                            {
                                tag: "option",
                                attributes: [
                                    {
                                        name: "value",
                                        value: "Farengheit"
                                    }
                                ],
                                content: "°F"
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
