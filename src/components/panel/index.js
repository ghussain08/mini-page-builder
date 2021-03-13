import React, { Component } from "react";
import Input from "./components/input";
import Label from "./components/label";
import Button from "./components/button";
class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    onDrageOver = (ev) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
    };

    onDragStart = (ev) => {
        const id = ev.target.dataset.id;
        const data = {
            ...this.state.items.find((item) => item.id === parseInt(id)),
        };
        ev.dataTransfer.setData("data", JSON.stringify(data));
    };

    onDrop = (ev) => {
        console.log(ev);
        ev.preventDefault();
        // Get the id of the target and add the moved element to the target's DOM
        const data = JSON.parse(ev.dataTransfer.getData("data"));
        const { clientX, clientY } = ev;
        const items = [...this.state.items];
        const itemIndex = items.findIndex(
            (item) => item.id === parseInt(data.id)
        );
        if (itemIndex > -1) {
            items[itemIndex] = { ...items[itemIndex], x: clientX, y: clientY };
            this.setState({ items });
            return;
        }
        items.push({
            data,
            id: Date.now(),
            x: clientX,
            y: clientY,
        });
        this.setState({ items });
    };

    isForeignItem = (id) => {
        const itemIndex = this.state.items.findIndex(
            (item) => item.id === parseInt(id)
        );
        return itemIndex > -1;
    };

    render() {
        return (
            <section
                onDragOver={this.onDrageOver}
                onDrop={this.onDrop}
                className="panel"
            >
                {this.state.items.map((item) => {
                    console.log(item);
                    const Component =
                        COMPONENT_TYPE_MAPPING[item.data.type] || null;
                    return (
                        <Component
                            item={item}
                            onDragStart={this.onDragStart}
                            data-id={item.id}
                            draggable={"true"}
                            style={{ top: item.y, left: item.x }}
                        />
                    );
                })}
            </section>
        );
    }
}
export default Panel;

const COMPONENT_TYPE_MAPPING = {
    input: Input,
    label: Label,
    button: Button,
};
