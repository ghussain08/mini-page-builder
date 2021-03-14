import React, { Component } from "react";
import Input from "./components/input";
import Label from "./components/label";
import Button from "./components/button";
import { getMousePosition } from "../../util";

const COMPONENT_MAPPING = {
    input: Input,
    label: Label,
    button: Button,
};

class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: {},
        };
    }

    onDrageOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    /**
     * This handles the repositioning of the elements
     * @param {*} e
     */
    onDragStart = (e) => {
        // get the id of element
        const id = e.target.dataset.id;
        const { x, y } = getMousePosition(e);
        // get the data of the dragged element
        const data = { ...this.state.elements[id] };

        e.dataTransfer.setData(
            "data",
            JSON.stringify({
                ...data,
                style: { ...data.style, offsetX: x, offsetY: y },
            })
        );
    };

    onDrop = (e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("data"));
        const { id, style } = data;

        // get the mouse position at the moment
        const { clientX, clientY } = e;

        // shallow copy elements object
        const elements = { ...this.state.elements };

        // if elements already has then it means it is being re-positioned
        // instead of drop
        const elId = id || Date.now();

        // add updated/new elements to the state
        elements[elId] = {
            ...data,
            id: elId,
            style: {
                ...style,
                left: parseInt(clientX - parseInt(style.offsetX)),
                top: parseInt(clientY - parseInt(style.offsetY)),
            },
            // we need to remove offsetX from mouse position
            // because element's left and top might not be mouse left and top
        };
        this.setState({ elements });
    };

    getComponent = (item) => {
        const Component = COMPONENT_MAPPING[item.type] || null;
        return Component ? (
            <Component
                key={item.id}
                item={item}
                onDragStart={this.onDragStart}
            />
        ) : null;
    };

    renderElements = () => {
        const { elements } = this.state;
        return Object.keys(elements).map((elId) =>
            this.getComponent(elements[elId])
        );
    };

    render() {
        return (
            <section
                onDragOver={this.onDrageOver}
                onDrop={this.onDrop}
                className="panel"
            >
                {this.renderElements()}
            </section>
        );
    }
}
export default Panel;
