import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions,
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import history from '../../history';
import useCoupon from './useCoupon.graphql';
import s from './Coupon.css';

class Coupon extends React.Component {
  static contextTypes = {
    client: PropTypes.shape({
      mutate: PropTypes.func.isRequired,
    }).isRequired,
  };

  static propTypes = {
    data: PropTypes.shape({
      coupon: PropTypes.shape({
        id: PropTypes.string.isRequired,
        used: PropTypes.bool.isRequired,
        class: PropTypes.shape({
          course: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
          }).isRequired,
          paid: PropTypes.bool.isRequired,
          price: PropTypes.number.isRequired,
          teacher: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
        }).isRequired,
      }),
    }),
  };

  static defaultProps = {
    data: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      used: props.data.coupon ? props.data.coupon.used : true,
    };
  }

  handleClick = () => {
    this.context.client
      .mutate({
        mutation: useCoupon,
        variables: {
          id: this.props.data.coupon.id,
        },
      })
      .then(() => {
        this.setState({
          used: true,
        });
        const { coupon } = this.props.data;
        history.push(`/class/${coupon.class.id}`);
      })
      .catch(() => {
        window.location.reload();
      });
  };

  render() {
    if (this.props.data.coupon) {
      const { coupon } = this.props.data;
      return (
        <div className={s.root}>
          <h1>{coupon.class.course.title} 课程兑换券</h1>
          <Card>
            <CardMedia>
              <img src={coupon.class.course.image} alt="" />
            </CardMedia>
            <CardTitle
              title={coupon.class.course.title}
              subtitle={`${coupon.class.price / 100}元`}
            />
            <CardText><pre className={s.description}>{coupon.class.course.description}</pre></CardText>
            <CardActions>
              {this.state.used ? (
                <RaisedButton label="兑换券已被使用" disabled />
              ) : (
                <RaisedButton label="兑换" primary onClick={this.handleClick} />
              )}
            </CardActions>
          </Card>
        </div>
      );
    }
    return <div />;
  }
}

export default withStyles(s)(Coupon);
