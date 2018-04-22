import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import { ListItem } from 'material-ui/List';
import classNames from 'classnames/bind';
import history from '../../history';
import s from './Class.css';

const cx = classNames.bind(s);

class Class extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      class: PropTypes.shape({
        id: PropTypes.string.isRequired,
        paid: PropTypes.bool.isRequried,
        beginAt: PropTypes.string.isRequired,
        teacher: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        course: PropTypes.shape({
          lessons: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              image: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
              video: PropTypes.string.isRequired,
              validatedIn: PropTypes.number.isRequired,
            }),
          ),
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  handleClick = (to, validate) => event => {
    if (event.defaultPrevented === true) {
      return;
    }
    event.preventDefault();
    if (!validate) {
      alert('课程还没开始');
    } else {
      history.push(to);
    }
  };

  render() {
    if (this.props.data) {
      const { data } = this.props;
      return (
        <div className={s.root}>
          <h1>课程列表</h1>
          {this.props.data.class.course.lessons.map(lesson => (
            <ListItem
              key={lesson.id}
              className={cx({
                closed:
                  data.class.beginAt +
                    lesson.validatedIn * 24 * 60 * 60 * 1000 >
                  new Date().getTime(),
              })}
              onClick={this.handleClick(
                `/class/${this.props.data.class.id}/lesson/${lesson.id}`,
                data.class.beginAt + lesson.validatedIn * 24 * 60 * 60 * 1000 <
                  new Date().getTime(),
              )}
            >
              <Card>
                <CardMedia>
                  <img src={lesson.image} alt="" />
                </CardMedia>
                <CardTitle title={lesson.title} subtitle={lesson.description} />
              </Card>
            </ListItem>
          ))}
        </div>
      );
    }
    return <div />;
  }
}

export default withStyles(s)(Class);
