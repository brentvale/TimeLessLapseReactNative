import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  loginUser,
} from './actions';

const mapStateToProps = state => ({
  ...state.auth,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators({
    loginUser,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
