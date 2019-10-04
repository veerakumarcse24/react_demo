import React from "react";
import { connect } from "react-redux";
import { login, logout, isAuth } from "../../actions";
import { toast } from "react-toastify";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  handleChange(e) //for twoway binding
  {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  loginSubmit(e) //for submit login
  {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password, returnUrl } = this.state;

    // stop here if form is invalid
    if (!(username && password)) {
      return;
    }

    this.setState({ loading: true });
    this.props.login(username, password).then(
      user => {
        this.props.isAuth();
        toast.success(user.text);
        const { from } = { from: { pathname: "/EmployeeList" } };
        this.props.history.push(from);
      },
      error => {toast.error(error);}
    );
  }

  render() {
    const { username, password, submitted } = this.state;
    return (
        <div className="jumbotron" role="document">
          <div className="text-center"><img src="/images/logo.jpg" className="rounded" /></div>
            <div className="form-group">
              <form name="login" onSubmit={this.loginSubmit} >
                <div
                  className={
                    "form-group" + (submitted && !username ? " has-error" : "")
                  }
                >
                  <label htmlFor="exampleInputEmail1">Username or Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                  {submitted && !username && (
                    <div className="text_danger">Username is required</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  {submitted && !password && (
                    <div className="text_danger">Password is required</div>
                  )}
                </div>
                <div className="col-md-12 text-center">
                  <button className="btn-success"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  login,
  logout,
  isAuth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
