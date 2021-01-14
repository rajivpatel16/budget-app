import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../../actions/auth';

const LoginPage = ({startLogin}) => {
    return (
        <div className="box-layout">
        <div className="box-layout__box">
        <h1 className="layout__title">Expenesify App</h1>
        <p>It's time to get your expenese under control.</p>
        <button onClick={startLogin}>Login with Google</button>
        </div>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined,mapDispatchToProps) (LoginPage);