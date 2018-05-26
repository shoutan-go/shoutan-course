import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { ListItem } from 'material-ui/List';
import makePayment from './payment.graphql';
import history from '../../history';
import s from './Classes.css';

class Classes extends React.Component {
  static contextTypes = {
    client: PropTypes.shape({
      mutate: PropTypes.func.isRequired,
    }).isRequired,
  };

  static propTypes = {
    data: PropTypes.shape({
      classes: PropTypes.arrayOf(
        PropTypes.shape({
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
        }),
      ).isRequired,
    }),
  };

  static defaultProps = {
    data: {
      classes: [],
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: 'Dialog With Actions',
      description: 'Dialog Body',
      open: false,
      paid: false,
      teacher: null,
      loading: false,
      notification: false,
    };
  }

  handleClick = clz => event => {
    if (event.defaultPrevented === true) {
      return;
    }
    event.preventDefault();
    this.setState({
      open: true,
      id: clz.id,
      title: clz.course.title,
      description: clz.course.description,
      paid: clz.paid,
      teacher: clz.teacher,
    });
  };

  handlePayment = clz => () => {
    var self = this;
    this.setState({
      loading: true,
      open: false,
    });
    this.context.client
      .mutate({
        mutation: makePayment,
        variables: {
          id: clz,
        },
      })
      .then(r => {
        if (typeof wx !== 'undefined') {
          console.info(r.data.payment);
          window.wx.ready(() => {
            window.wx.chooseWXPay(
              Object.assign(r.data.payment, {
                success(res) {
                  if (res.errMsg === 'chooseWXPay:ok') {
                    self.setState({
                      notification: true,
                    });
                  }
                }
              }),
            );
          });
        }
      })
      .catch(() => {
        window.location.reload();
      });
  };

  handleSubmit = () => {
    history.push(`/class/${this.state.id}`);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton label="关闭" primary onClick={this.handleClose} />,
    ];
    if (this.state.paid) {
      actions.push(
        <FlatButton label="查看详情" primary onClick={this.handleSubmit} />,
      );
    } else {
      actions.push(
        <FlatButton
          label="购买课程"
          primary
          onClick={this.handlePayment(this.state.id)}
        />,
      );
    }

    return (
      <div className={s.root}>
        <h1>开班列表</h1>
        {this.props.data.classes.map(clz => (
          <ListItem key={clz.id} onClick={this.handleClick(clz)}>
            <Card>
              <CardMedia>
                <img src={clz.course.image} alt="" />
              </CardMedia>
              <CardTitle
                title={clz.course.title}
                subtitle={clz.paid ? '已付费' : `${clz.price / 100}元`}
              />
              <CardText>{clz.course.description}</CardText>
            </Card>
          </ListItem>
        ))}
        <Dialog
          title={this.state.title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {this.state.paid ? (
            <img className={s.centered} src={this.state.teacher} alt="" />
          ) : (
            ''
          )}
          <br />
          {this.state.description}
        </Dialog>
        <Dialog open={this.state.loading} modal>
          <CircularProgress
            className={s.centered}
            style={{
              display: 'block',
            }}
          />
        </Dialog>
        <Dialog open={this.state.notification} title="购买成功">
          <p className={s.centered}>长按二维码加任课老师微信</p>
          <img className={s.centered} src={this.state.teacher} alt="" />
        </Dialog>
      </div>
    );
  }
}

export default withStyles(s)(Classes);
