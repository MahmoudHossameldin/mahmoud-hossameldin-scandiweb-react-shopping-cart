import React, { Component } from "react";
import styles from "./ProductAttribute.module.css";

export default class ProductAttribute extends Component {
  attribute = this.props.attribute;
  state = {
    selectedAttribute: this.attribute.items[0],
  };

  changeSelectedAttribute = (selectedAttribute) => {
    this.setState({
      selectedAttribute: selectedAttribute,
    });
  };

  render() {
    const attribute = this.attribute;
    console.log(this.state.selectedAttribute);
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
                item === this.state.selectedAttribute ? styles.selected : ""
              }`}
              onClick={() => this.changeSelectedAttribute(item)}
            >
              {attribute.type !== "swatch" && item.displayValue}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
