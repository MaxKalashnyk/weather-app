import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";

export default class FavouriteToggle extends Component {
    constructor(host, props) {
        super(host, props);
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
    }

    render() {
        // console.log(this.state);
        return [{}];
    }
}
