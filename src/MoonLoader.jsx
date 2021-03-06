/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { keyframes, css, jsx } from '@emotion/core';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const moon = keyframes`
  100% {transform: rotate(360deg)}
`;

class Loader extends React.Component {
    moonSize = () => {
      const { size } = this.props;

      return size / 7;
    };

  ballStyle = size => {
    const { sizeUnit } = this.props;

    return css`{
          width: ${`${size}${sizeUnit}`};
          height: ${`${size}${sizeUnit}`};
          border-radius: 100%;
      }`;
  };

    wrapper = () => {
      const { size, sizeUnit } = this.props;

      return css`{
            position: relative;
            width: ${`${size + (this.moonSize() * 2)}${sizeUnit}`};
            height: ${`${size + (this.moonSize() * 2)}${sizeUnit}`};
            animation: ${moon} 0.6s 0s infinite linear;
            animation-fill-mode: forwards;
        }`;
    };

    ball = () => {
      const { color, size, sizeUnit } = this.props;

      return css`
            ${this.ballStyle(this.moonSize())};
            background-color: ${color};
            opacity: 0.8;
            position: absolute;
            top: ${`${(size / 2) - (this.moonSize() / 2)}${sizeUnit}`};
            animation: ${moon} 0.6s 0s infinite linear;
            animation-fill-mode: forwards;
        `;
    };


    circle = () => {
      const { size, color } = this.props;

      const wrapper = css`
            ${this.ballStyle(size)};
            border: ${this.moonSize()}px solid ${color};
            opacity: 0.1;
        `;

      return this.props.css ? css`${wrapper};${this.props.css}` : wrapper;
    };

    render() {
      const { loading } = this.props;

      return loading ?
        <div css={this.wrapper()}>
          <div css={this.ball()} />
          <div css={this.circle()} />
        </div> : null;
    }
}

Loader.propTypes = {
  loading: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
  sizeUnit: PropTypes.string,
  css: PropTypes.shape({
    name: PropTypes.string,
    styles: PropTypes.string
  })
};

Loader.defaultProps = {
  loading: true,
  color: '#000000',
  size: 60,
  sizeUnit: 'px',
  css: {}
};

const Component = onlyUpdateForKeys(['loading', 'color', 'size', 'sizeUnit', 'css'])(Loader);
Component.defaultProps = Loader.defaultProps;
export default Component;
