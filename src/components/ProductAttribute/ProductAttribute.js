import React, { Component } from "react";
import styles from "./ProductAttribute.module.css";

export default class ProductAttribute extends Component {
  attribute = this.props.attribute;
  attributesAndSelections = this.props.attributesAndSelections;
  state = {
    selectedValue: this.attribute.items[0],
  };

  changeSelection = (newSelection) => {
    this.setState({
      selectedValue: newSelection,
    });
  };

  sendAttributeToParent = () => {
    this.attributesAndSelections(
      this.attribute.name,
      this.state.selectedValue.value
    );
  };

  componentDidMount() {
    this.sendAttributeToParent();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedValue !== this.state.selectedValue) {
      this.sendAttributeToParent();
    }
  }

  render() {
    const attribute = this.attribute;
    return (
      <div className={styles.options}>
        <span>{`${attribute.name}:`}</span>
        <div className={styles.choices}>
          {attribute.items.map((item) => (
            <button
              key={item.id}
              style={
                attribute.type === "swatch"
                  ? {
                      backgroundColor: item.value,
                    }
                  : { background: "none" }
              }
              className={`${attribute.type === "swatch" ? styles.swatch : ""} ${
                item === this.state.selectedValue ? styles.selected : ""
              }`}
              onClick={() => this.changeSelection(item)}
            >
              {attribute.type !== "swatch" && item.value}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
