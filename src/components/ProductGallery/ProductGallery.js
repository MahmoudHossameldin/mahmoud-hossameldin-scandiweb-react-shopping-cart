import React, { Component } from "react";

export default class ProductGallery extends Component {
  product = this.props.product;
  state = {
    img: this.product.gallery[0],
  };
  replaceImg = (src) => {
    this.setState({ img: src });
  };

  render() {
    const product = this.product;
    return (
      <>
        <div>
          {product.gallery.map((img) => (
            <img
              src={img}
              alt={product.name}
              key={img}
              onClick={() => this.replaceImg(img)}
            />
          ))}
        </div>
        <div>
          <img src={this.state.img} alt={product.name} />
        </div>
      </>
    );
  }
}
