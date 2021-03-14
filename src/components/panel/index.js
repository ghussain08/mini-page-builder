import React, { Component } from "react";
import Input from "./components/blocks/input";
import Label from "./components/blocks/label";
import Button from "./components/blocks/button";
import { getMousePosition } from "../../util";
import PropertyModal from "./components/property-modal";
const COMPONENT_MAPPING = {
    input: Input,
    label: Label,
    button: Button,
};

/**
 * @author Gulam Hussain 14 March 2021
 * @class Elements drop zone
 */
class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: JSON.parse(localStorage.getItem("mp")) || {},
            isModalOpen: false,
            modalBlock: null,
        };
    }

    onDrageOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    // This handles the repositioning of the elements
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
                style: {
                    ...data.style,
                    offsetX: x,
                    offsetY: y,
                },
            })
        );
    };

    // Handler droping and repositioning of the blocks
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
                // we need to remove offsetX from mouse position
                // because element's left and top might not be mouse left and top
                left: parseInt(clientX - parseInt(style.offsetX)),
                top: parseInt(clientY - parseInt(style.offsetY)),
            },
        };
        this.setState({ elements }, () => !id && this.openPropertyModal(elId));

        this.persistState(elements);
    };

    // Get component for given element type
    getComponent = (block) => {
        const Component = COMPONENT_MAPPING[block.type] || null;
        return Component ? (
            <Component
                key={block.id}
                block={block}
                onDragStart={this.onDragStart}
                onKeyUp={this.onKeyUp}
            />
        ) : null;
    };

    // handle keyup event on elements
    onKeyUp = (e) => {
        const id = e.target.dataset.id;
        if (e.keyCode === 13) {
            this.openPropertyModal(id);
            return;
        }
        if (e.keyCode === 8) {
            this.onDelete(id);
            return;
        }
    };

    // open property modal, either on Press Enter or when element get droped
    openPropertyModal = (blockId) => {
        const block = { ...this.state.elements[blockId] };
        this.setState({ isModalOpen: true, modalBlock: block });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false, modalBlock: null });
    };

    // Fires when user click on save changes button in Modal
    onPropertiesUpdate = (updatedBlock) => {
        console.log(updatedBlock);
        const elements = { ...this.state.elements };
        elements[updatedBlock.id] = { ...updatedBlock };
        this.setState({ elements });
        this.persistState(elements);
    };

    // Render dragged items
    renderElements = () => {
        const { elements } = this.state;
        return Object.keys(elements).map((elId) =>
            this.getComponent(elements[elId])
        );
    };

    // user selects a element and click on DELETE key
    onDelete = (blockId) => {
        const elements = { ...this.state.elements };
        delete elements[blockId];
        this.setState({ elements });
        this.persistState(elements);
    };

    persistState = (elements) => {
        localStorage.setItem("mp", JSON.stringify(elements));
    };

    render() {
        return (
            <section
                onDragOver={this.onDrageOver}
                onDrop={this.onDrop}
                className="panel"
            >
                {this.renderElements()}
                {this.state.isModalOpen ? (
                    <PropertyModal
                        block={this.state.modalBlock}
                        onClose={this.closeModal}
                        title="Edit Block"
                        onPropertiesUpdate={this.onPropertiesUpdate}
                    />
                ) : null}
            </section>
        );
    }
}
export default Panel;
