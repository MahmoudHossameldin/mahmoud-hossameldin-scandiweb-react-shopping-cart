import React, { Component } from "react";
import DOMPurify from "dompurify";
import styles from "./ProductDescription.module.css";

export default class ProductDescription extends Component {
  render() {
    return (
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(this.props.description),
        }}
      ></div>
    );
  }
}
