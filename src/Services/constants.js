export const currentWeaterURLString =
    "https://api.openweathermap.org/data/2.5/weather?q=";
export const weatherForecastURLString =
    "https://api.openweathermap.org/data/2.5/forecast?q=";
export const apiKey = "c1bfe9b98646ae15af74164518f99538";

export const initAutocomplete = (input, callback) => {
    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["(cities)"]
    });
    autocomplete.addListener("place_changed", () =>
        callback(autocomplete.getPlace())
    );
};

export const formatValue = value => {
    if (!value) {
        return "";
    }
    return Math.round(parseFloat(value));
};

export const checkProperty = property => {
    return property ? property : "";
};
