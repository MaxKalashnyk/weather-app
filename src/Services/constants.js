const pascalToMmHg = 0.75006;

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
    return Math.round(value);
};

export const checkProperty = property => {
    return property ? property : "";
};

export const getCurrentDate = () => {
    const currDate = new Date();
    const day = String(currDate.getDate()).padStart(2, "0");
    const month = String(currDate.getMonth() + 1).padStart(2, "0");
    const year = currDate.getFullYear();
    const finalDate = `${day}/${month}/${year}`;

    return finalDate;
};

export const getCurrentDayName = () => {
    const currDate = new Date();
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const day = new Date(currDate);
    const dayName = days[day.getDay()];

    return dayName;
};

export const convertPressure = pressureValue => {
    if (!pressureValue) {
        return "";
    }

    return Math.round(pressureValue * pascalToMmHg);
};

export const defineWindDirection = degrees => {
    let windDirectionString = "";

    if (!degrees) {
        return "";
    } else {
        if (degrees <= 22.5 || (degrees > 337.5 && degrees <= 360)) {
            windDirectionString = "North";
        } else if (degrees > 22.5 && degrees < 67.5) {
            windDirectionString = "North-East";
        } else if (degrees > 67.5 && degrees < 112.5) {
            windDirectionString = "East";
        } else if (degrees > 112.5 && degrees < 157.5) {
            windDirectionString = "South-East";
        } else if (degrees > 157.5 && degrees < 202.5) {
            windDirectionString = "South";
        } else if (degrees > 202.5 && degrees < 247.5) {
            windDirectionString = "South-West";
        } else if (degrees > 247.5 && degrees < 292.5) {
            windDirectionString = "West";
        } else if (degrees > 292.5 && degrees < 337.5) {
            windDirectionString = "North-West";
        }

        return windDirectionString;
    }
};

// export const convertDate = milliseconds => {
//     if (!milliseconds) {
//         return "";
//     } else {
//         let minutes = parseInt((milliseconds / (1000 * 60)) % 60),
//             hours = parseInt((milliseconds / (1000 * 60 * 60)) % 24);

//         hours = hours < 10 ? "0" + hours : hours;
//         minutes = minutes < 10 ? "0" + minutes : minutes;

//         return hours + ":" + minutes + ":";
//     }
// };
