import React, { Component } from "react";
import leftArrow from "../../icons/arrow-left.svg";
import rightArrow from "../../icons/arrow-right.svg";
import styles from "./GallerySlider.module.css";

export default class GallerySlider extends Component {
  gallery = this.props.product.gallery;

  state = {
    index: 0,
  };

  prevThumbnail = () => {
    this.state.index === 0
      ? this.setState({ index: this.gallery.length - 1 })
      : this.setState((prevState) => ({ index: prevState.index - 1 }));
  };
  nextThumbnail = () => {
    this.state.index === this.gallery.length - 1
      ? this.setState({ index: 0 })
      : this.setState((prevState) => ({ index: prevState.index + 1 }));
  };

  render() {
    return (
      <>
        <img
          src={this.gallery[this.state.index]}
          alt={this.props.product.title}
        />
        {this.gallery.length > 1 && (
          <>
            <span className={styles.leftArrow} onClick={this.prevThumbnail}>
              <img src={leftArrow} alt="previous thumbnail" />
            </span>
            <span className={styles.rightArrow} onClick={this.nextThumbnail}>
              <img src={rightArrow} alt="next thumbnail" />
            </span>
          </>
        )}
      </>
    );
  }
}
