import React from "react";
import { connect } from "react-redux";
import { getUserData, logout } from "../../actions";
import { toast } from "react-toastify";

class EmployeeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.props.getUserData().then(
      response => {
      },
      error => {}
    );
  }

  logout(){
    this.props.logout().then(
      response => {
        toast.info(response.text);
        const { from } = { from: { pathname: "/login" } };
        this.props.history.push(from);
      },
      error => {}
    );
  }

  render() {
    return (
      <div className="jumbotron">
        <div>
          <h3 className="title_text">Employee Data's</h3>
          <button className="button_postition btn-primary" onClick={()=>this.logout()}>Logout</button>
        </div>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>Email</th>
            <th>PHONE</th>
            <th>GENDER</th>
            <th>AGE</th>
          </tr>
        </thead>
        <tbody>
        {this.props.userList.map((user, key) => {
          return (
          <tr key={key}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phoneNo}</td>
          <td>{user.gender}</td>
          <td>{user.age}</td>
          </tr>
         )})}
        </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {userList: state.auth.users_list, is_auth: state.auth.is_auth};
};

const mapDispatchToProps = {
  getUserData, logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeComponent);
