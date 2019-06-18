var _templateObject = _taggedTemplateLiteralLoose(["\n  ", " ", ";\n"], ["\n  ", " ", ";\n"]),
    _templateObject2 = _taggedTemplateLiteralLoose(["\n  padding: 0.3125rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  line-height: 1.875rem;\n  display: flex;\n  align-items: center;\n  font-size: 0.8125rem;\n"], ["\n  padding: 0.3125rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  line-height: 1.875rem;\n  display: flex;\n  align-items: center;\n  font-size: 0.8125rem;\n"]);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import Prediction from "../Prediction";

var Wrapper = styled.div(_templateObject, function (props) {
  return props.clickable && "&:hover {background: #f5f5f5;cursor: pointer;} ";
}, function (props) {
  return props.active && "background: #f5f5f5;";
});

var Item = styled.div(_templateObject2);

var ListItem = function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ListItem.prototype.renderDefault = function renderDefault(item) {
    var textNoResults = this.props.textNoResults;

    return React.createElement(
      Item,
      null,
      item ? React.createElement(Prediction, { item: item }) : textNoResults
    );
  };

  ListItem.prototype.renderItem = function renderItem(item) {
    var customRender = this.props.customRender;

    return customRender ? customRender(item) : this.renderDefault(item);
  };

  ListItem.prototype.render = function render() {
    var _props = this.props,
        active = _props.active,
        item = _props.item,
        onClick = _props.onClick;

    return React.createElement(
      Wrapper,
      {
        active: active,
        clickable: item,
        onClick: item && function () {
          return onClick(item);
        }
      },
      this.renderItem(item)
    );
  };

  return ListItem;
}(React.Component);

ListItem.propTypes = process.env.NODE_ENV !== "production" ? {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  item: PropTypes.shape({
    description: PropTypes.string,
    matched_substrings: PropTypes.arrayOf(PropTypes.shape({
      length: PropTypes.number.isRequired,
      offset: PropTypes.number.isRequired
    }))
  }),
  customRender: PropTypes.func,
  textNoResults: PropTypes.string
} : {};

ListItem.defaultProps = {
  active: false
};

export default ListItem;