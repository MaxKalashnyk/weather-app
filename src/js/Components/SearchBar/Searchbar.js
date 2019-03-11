import Component from "../../framework/Component";
import { initAutocomplete } from "../../../Services/constants";

export default class Searchbar extends Component {
    constructor(host, props) {
        super(host, props);
        // this.handleSmth = this.handleSmth.bind(this);
        this.handleSmth();
        // setTimeout(this.handleSmth, 500);
    }

    handleSmth() {
        const input = document.querySelector(".main-search-input");
        console.log(input);
        initAutocomplete(input);
    }

    render() {
        return [
            {
                tag: "div",
                content: "",
                classList: ["search-block"],
                children: [
                    {
                        tag: "button",
                        classList: ["add-to-favourite"]
                    },
                    {
                        tag: "input",
                        classList: ["main-search-input"],
                        attributes: [
                            {
                                name: "type",
                                value: "text"
                            },
                            {
                                name: "placeholder",
                                value: "Location"
                            }
                        ]
                    },
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
                                    }
                                ],
                                content: "°C"
                            },
                            {
                                tag: "option",
                                attributes: [
                                    {
                                        name: "value",
                                        value: "Farengheit"
                                    }
                                ],
                                content: "°F"
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
