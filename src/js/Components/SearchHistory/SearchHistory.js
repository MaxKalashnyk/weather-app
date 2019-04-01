import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";

export default class SearchHistory extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("RECENTLYVIEWEDPLACES", this.updateMyself);
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

        this.updateMyself = this.updateMyself.bind(this);
        this.clearSearchHistoryList = this.clearSearchHistoryList.bind(this);
    }

    clearSearchHistoryList() {
        this.state = {
            storageRecentlyViewedList: []
        };
        AppState.update("RECENTLYVIEWEDPLACES", {
            storageRecentlyViewedList: []
        });

        this.putItemToLocalStorage(
            "recentlyViewedPlaces",
            this.state.storageRecentlyViewedList
        );
    }

    putItemToLocalStorage(key, list) {
        localStorage.setItem(key, JSON.stringify(list));
    }

    render() {
        // console.log(this.state);

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
                                            content: placeItem.formattedPlace,
                                            attributes: [
                                                {
                                                    name: "data-name",
                                                    value: placeItem.place
                                                },
                                                {
                                                    name: "data-placeid",
                                                    value: placeItem.placeId
                                                }
                                            ]
                                        };
                                    }
                                )
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
