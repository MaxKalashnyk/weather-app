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
    }

    init() {
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
            "checkItemAndPushToArray",
            "checkPlaceForFavourite"
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
        console.log(place);
        this.props.city = place.name;
        this.props.cityFormatted = place.formatted_address;

        this.checkItemAndPushToArray(this.recentlyViewedPlacesArray);

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

    checkItemAndPushToArray(array) {
        console.log(array);

        if (
            array.filter(
                item =>
                    item.place === this.props.city &&
                    item.formattedPlace === this.props.cityFormatted
            ).length === 0
        ) {
            const placeObject = {
                place: this.props.city,
                formattedPlace: this.props.cityFormatted
            };
            array.push(placeObject);
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
        this.checkItemAndPushToArray(this.favouritePlacesArray);
        AppState.update("FAVOURITEPLACES", {
            favouritePlaces: this.favouritePlacesArray
        });
        this.checkPlaceForFavourite();
    }

    checkPlaceForFavourite() {
        const matchedArrayItem = this.favouritePlacesArray.find(item => {
            return (
                item.place === this.props.city &&
                item.formattedPlace === this.props.cityFormatted
            );
        });

        if (matchedArrayItem) {
            this.isFavouriteCheck = true;
        }

        console.log(this);
    }

    render() {
        const activeButtonClass = this.isFavouriteCheck
            ? "add-to-favourite-active"
            : "button";

        console.log(activeButtonClass);

        return [
            {
                tag: "div",
                content: "",
                classList: ["search-block"],
                children: [
                    {
                        tag: "button",
                        classList: ["add-to-favourite", `${activeButtonClass}`],
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
