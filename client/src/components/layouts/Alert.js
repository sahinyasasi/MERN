import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { STATES } from "mongoose";
const Alert = ({ alerts }) => {
  return <div></div>;
};

Alert.propTypes = {};
const mapStateToProps = (alert) => ({
  alerts: state.alert,
});

export default connect()(Alert);
