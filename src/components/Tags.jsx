import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "react-uuid";
import { allTags } from "../store/actions";

class Tags extends Component {
  componentDidMount() {
    let url = "https://conduit.productionready.io/api/tags";
    fetch(url)
      .then((res) => res.json())
      .then(({ tags }) => this.props.dispatch(allTags(tags)));
  }

  render() {
    const { tags } = this.props;
    return (
      <div>
        {tags.map((tag) => {
          return <p key={uuid()}>{tag}</p>;
        })}
      </div>
    );
  }
}

function mapState({ tags }) {
  return { tags };
}

export default connect(mapState)(Tags);
