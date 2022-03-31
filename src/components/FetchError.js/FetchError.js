import React, { Component } from "react";
import styles from "./FetchError.module.css";

export default class FetchError extends Component {
  render() {
    return (
      <div className={styles.fetchError}>
        Cannot get the store data from the API, please install{" "}
        <a href="https://github.com/scandiweb/junior-react-endpoint">
          this repo
        </a>{" "}
        and set it up locally to fetch the data from the backend.
      </div>
    );
  }
}
