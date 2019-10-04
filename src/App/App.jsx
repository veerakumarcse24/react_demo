import React from 'react';
import { BrowserRouter as Router, Route,withRouter,Redirect,Switch } from 'react-router-dom';
import { PrivateRoute, LoginRoute } from '../_routes';
import EmployeeComponent from '../_components/Dashboard/EmployeeComponent';
import LoginComponent from '../_components/LoginPage/LoginComponent';
import { connect } from 'react-redux';
import { isAuth } from '../actions';
import { ToastContainer } from 'react-toastify';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.is_auth = false;
    }


    componentDidMount() {
        this.is_auth = this.props.is_auth;
    }
    render() {
        return (
            <div>
                <ToastContainer/>
                <div className="homepage">
                    <div>
                    <Switch>
                        <LoginRoute exact path="/login" component={LoginComponent} />
                        <PrivateRoute exact path="/EmployeeList" component={EmployeeComponent} />
                        <Route path="*" render={() => <Redirect to={{pathname: "/login"}} />} />
                    </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        is_auth : state.auth.is_auth
    }
}

const mapDispatchToProps = {
    isAuth
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));