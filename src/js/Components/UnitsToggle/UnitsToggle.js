import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";

export default class UnitsToggle extends Component {
    constructor(host, props) {
        super(host, props);
        this.isMetricUnitsCheck;
        AppState.watch("UNITSCHECK", this.updateMyself);
    }
    updateMyself(substate) {
        this.updateState(substate);
    }

    init() {
        this.state = {};
        this.updateMyself = this.updateMyself.bind(this);
        this.handleUnits = this.handleUnits.bind(this);
    }

    handleUnits() {
        if (this.state.hasOwnProperty("isMetricUnits")) {
            this.isMetricUnitsCheck = this.state.isMetricUnits;
        } else {
            this.isMetricUnitsCheck = true;
        }

        console.log(this.isMetricUnitsCheck);

        this.isMetricUnitsCheck = !this.isMetricUnitsCheck;

        console.log(this.isMetricUnitsCheck);

        AppState.update("UNITSCHECK", {
            isMetricUnits: this.isMetricUnitsCheck
        });
    }

    render() {
        // console.log(this.state.isMetricUnits);
        // console.log(this.isMetricUnitsCheck);
        return [
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
                            },
                            this.state.hasOwnProperty("isMetricUnits") &&
                            this.state.isMetricUnits === true
                                ? { name: "selected", value: "" }
                                : {}
                        ],
                        content: "°C"
                    },
                    {
                        tag: "option",
                        attributes: [
                            {
                                name: "value",
                                value: "Farengheit"
                            },
                            this.state.hasOwnProperty("isMetricUnits") &&
                            this.state.isMetricUnits === false
                                ? { name: "selected", value: "" }
                                : {}
                        ],
                        content: "°F"
                    }
                ],
                eventHandlers: {
                    change: this.handleUnits
                }
            }
        ];
    }
}
