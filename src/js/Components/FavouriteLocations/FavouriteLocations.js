import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";

export default class FavouriteLocations extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("FAVOURITEPLACES", this.updateMyself);
        AppState.watch("FAVOURITEPLACECHECK", this.updateMyself);
    }
    updateMyself(substate) {
        this.updateState(substate);
    }

    init() {
        this.state = {};
        this.updateMyself = this.updateMyself.bind(this);
    }

    clearFavouritePlacesList() {
        this.state = {};
        AppState.update("FAVOURITEPLACES", {
            favouritePlaces: []
        });
        AppState.update("FAVOURITEPLACECHECK", {
            favouritePlaceCheck: false
        });
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
                                    "user-activity-title-fav"
                                ],
                                content: "favourite"
                            },
                            {
                                tag: "button",
                                classList: [
                                    "remove-button",
                                    "remove-button-favourite"
                                ],
                                eventHandlers: {
                                    click: this.clearFavouritePlacesList
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
                                    "favouritePlaces"
                                )
                                    ? this.state.favouritePlaces.map(
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
