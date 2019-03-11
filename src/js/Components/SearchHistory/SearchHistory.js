import Component from "../../framework/Component";

export default class SearchHistory extends Component {
    constructor(host, props) {
        super(host, props);
    }
    render() {
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
                                classList: ["remove-button"]
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
                                children: [
                                    {
                                        tag: "li",
                                        classList: ["user-activity-list-item"],
                                        content: "Dresden, DE"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
