import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import history from '../../history';
import s from './Lesson.css';

class Lesson extends React.Component {
  static propTypes = {
    lesson: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      video: PropTypes.string,
      image: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  handleClick = to => event => {
    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(to);
  };

  render() {
    return (
      <div className={s.root}>
        <h1>{this.props.lesson.title}</h1>
        <Card>
          <CardMedia>
            {this.props.lesson.video === null ? (
              <div>未购买课程(需要一张图片)</div>
            ) : (
              <video src={this.props.lesson.video} controls="controls" />
            )}
          </CardMedia>
          <CardTitle
            title={this.props.lesson.title}
            subtitle={this.props.lesson.description}
          />
        </Card>
      </div>
    );
  }
}

export default withStyles(s)(Lesson);
