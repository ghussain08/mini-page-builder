import React, { Component } from "react";
import Modal from "../../modal";
class PropertyModal extends Component {
    constructor(props) {
        super(props);
        const { text } = this.props.block;
        this.state = { ...this.setInitialProperties(), text };
    }

    // remove "px" strings
    setInitialProperties = () => {
        const { style } = this.props.block;
        const updatedStyle = {};
        Object.keys(style).forEach((property) => {
            updatedStyle[property] = parseFloat(style[property]);
        });
        return updatedStyle;
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    saveChanges = (e) => {
        e.preventDefault();
        const { left, top, fontSize, fontWeight } = this.state;
        const updatedBlock = {
            ...this.props.block,
            text: this.state.text,
            style: {
                ...this.props.block.style,
                left: `${left}px`,
                top: `${top}px`,
                fontSize: `${fontSize}px`,
                fontWeight: parseInt(fontWeight),
            },
        };
        this.props.onPropertiesUpdate(updatedBlock);
        this.props.onClose();
    };

    render() {
        return (
            <Modal title={this.props.title} onClose={this.props.onClose}>
                <form onSubmit={this.saveChanges} className="property-modal">
                    <div className="form-group">
                        <label htmlFor="text">Text</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            id="text"
                            name="text"
                            value={this.state.text}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="x">X</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            id="x"
                            name="left"
                            value={this.state.left}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="y">Y</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            id="y"
                            name="top"
                            value={this.state.top}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="font-size">Font Size</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            id="font-size"
                            name="fontSize"
                            value={this.state.fontSize}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="font-weight">Font Weight</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            id="font-weight"
                            name="fontWeight"
                            value={this.state.fontWeight}
                        />
                    </div>
                    <button type="submit">Save Changes</button>
                </form>
            </Modal>
        );
    }
}
export default PropertyModal;
