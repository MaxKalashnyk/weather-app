import Component from "../../framework/Component";
import WeatherForecastItem from "../../Components/WeatherForecastItem/WeatherForecastItem";
import AppState from "../../../Services/AppState";

export default class WeatherForecast extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("WEATHERFORECASTDATA", this.updateMyself);
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    init() {
        this.state = {};
        this.updateMyself = this.updateMyself.bind(this);
    }

    createSortedList(list) {
        const hoursList = [];
        const indexesList = [3, 11, 19, 27, 35];

        indexesList.forEach(item => {
            hoursList.push(list[item]);
        });

        return hoursList;
    }

    render() {
        this.props.daysList =
            this.state.weatherForecastData &&
            // this.state.weatherForecastData.list.length > 0
            //     ? this.state.weatherForecastData.list.filter(
            //           (item, index) => index % 8 === 0
            //       )
            //     : [];
            this.state.weatherForecastData.list.length > 0
                ? this.createSortedList(this.state.weatherForecastData.list)
                : [];
        return [
            {
                tag: "div",
                classList: ["forecast-nearest-days"],
                children:
                    this.props.daysList.length > 0
                        ? this.props.daysList.map(listItem => {
                              return {
                                  tag: WeatherForecastItem,
                                  props: { ...listItem }
                              };
                          })
                        : ""
            }
        ];
    }
}
