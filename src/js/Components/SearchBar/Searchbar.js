import Component from "../../framework/Component";
import { initAutocomplete } from "../../../Services/constants";
import { currentWeaterURLString } from "../../../Services/constants";
import { weatherForecastURLString } from "../../../Services/constants";
import AppState from "../../../Services/AppState";
import WeatherDataService from "../../../Services/WeatherDataService";
import UnitsToggle from "../UnitsToggle/UnitsToggle";

export default class Searchbar extends Component {
    constructor(host, props) {
        super(host, props);
        this.urlsArray = [];
        this.isFavouriteCheck = false;
        AppState.watch("FAVOURITEPLACECHECK", this.updateMyself);
        AppState.watch("FAVOURITEPLACES", this.updateMyself);
    }

    init() {
        const storageRecentlyViewedList = localStorage.getItem(
            "recentlyViewedPlaces"
        )
            ? JSON.parse(localStorage.getItem("recentlyViewedPlaces"))
            : [];
        const storageFavouritePlaces = localStorage.getItem("favouritePlaces")
            ? JSON.parse(localStorage.getItem("favouritePlaces"))
            : [];

        this.state = {
            storageRecentlyViewedList: storageRecentlyViewedList,
            storageFavouritePlaces: storageFavouritePlaces
        };

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

        this.checkItemAndPushToArray(this.state.storageRecentlyViewedList);

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
                this.state.storageFavouritePlaces = this.state.storageFavouritePlaces.filter(
                    item => {
                        return item.placeId !== this.props.placeId;
                    }
                );
            }
        }
    }

    checkFavouritePlace() {
        const matchedItem = this.state.storageFavouritePlaces.find(item => {
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
            AppState.update("RECENTLYVIEWEDPLACES", {
                storageRecentlyViewedList: this.state.storageRecentlyViewedList
            });
            this.putItemToLocalStorage(
                "recentlyViewedPlaces",
                this.state.storageRecentlyViewedList
            );
        }
    }

    handleFavouritePlace() {
        this.checkItemAndPushToArray(this.state.storageFavouritePlaces, true);
        // console.log(this.favouritePlacesArray);
        AppState.update("FAVOURITEPLACECHECK", {
            favouritePlaceCheck: this.isFavouriteCheck
        });
        AppState.update("FAVOURITEPLACES", {
            storageFavouritePlaces: this.state.storageFavouritePlaces
        });

        this.putItemToLocalStorage(
            "favouritePlaces",
            this.state.storageFavouritePlaces
        );
    }

    putItemToLocalStorage(key, list) {
        localStorage.setItem(key, JSON.stringify(list));
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
                        tag: UnitsToggle
                    }
                ]
            }
        ];
    }
}
