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
        this.state = {};
        this.updateMyself = this.updateMyself.bind(this);
        this.clearSearchHistoryList = this.clearSearchHistoryList.bind(this);
    }

    clearSearchHistoryList() {
        this.state = {};
        AppState.update("RECENTLYVIEWEDPLACES", {
            recentlyViewedPlaces: []
        });
    }

    render() {
        console.log(this.state);

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
                                children: this.state.hasOwnProperty(
                                    "recentlyViewedPlaces"
                                )
                                    ? this.state.recentlyViewedPlaces.map(
                                          placeItem => {
                                              return {
                                                  tag: "li",
                                                  classList: [
                                                      "user-activity-list-item"
                                                  ],
                                                  content:
                                                      placeItem.formattedPlace,
                                                  attributes: [
                                                      {
                                                          name: "data-name",
                                                          value: placeItem.place
                                                      }
                                                  ]
                                              };
                                          }
                                      )
                                    : []
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
