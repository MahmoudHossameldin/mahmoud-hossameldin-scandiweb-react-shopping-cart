import React, { Component } from "react";
import styles from "./ProductAttribute.module.css";

export default class ProductAttribute extends Component {
  attribute = this.props.attribute;
  attributeNameAndValue = this.props.attributesSelections;
  state = {
    selectedAttribute: this.attribute.items[0],
  };

  changeSelectedAttribute = (selectedAttribute) => {
    this.setState({
      selectedAttribute: selectedAttribute,
    });
  };

  sendAttributeToParent = () => {
    this.attributeNameAndValue(
      this.attribute.name,
      this.state.selectedAttribute.value
    );
  };

  componentDidMount() {
    this.sendAttributeToParent();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedAttribute !== this.state.selectedAttribute) {
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
                item === this.state.selectedAttribute ? styles.selected : ""
              }`}
              onClick={() => this.changeSelectedAttribute(item)}
            >
              {attribute.type !== "swatch" && item.value}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
