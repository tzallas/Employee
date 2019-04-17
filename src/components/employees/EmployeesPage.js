import React from "react";
import { connect } from "react-redux";
import * as employeeActions from "../../redux/actions/employeeActions";
import * as skillActions from "../../redux/actions/skillActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import EmployeeList from "./EmployeeList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class EmployeesPage extends React.Component {
  state = {
    redirectToAddEmployeePage: false
  };

  componentDidMount() {
    const { employees, skills, actions } = this.props;

    if (employees.length === 0) {
      actions.loadEmployees().catch(error => {
        alert("Loading employees failed" + error);
      });
    }

    if (skills.length === 0) {
      actions.loadSkills().catch(error => {
        alert("Loading skills failed" + error);
      });
    }
  }

  handleDeleteEmployee = employee => {
    toast.success("Employee deleted");
    this.props.actions.deleteEmployee(employee).catch(error => {
      toast.error("Delete Failed." + error.message, { autoClose: false });
    });
  };

  render() {
    return (
      <>
        {this.state.redirectToAddEmployeePage && <Redirect to="/employee" />}
        <h2>Employees</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary"
              onClick={() => this.setState({ redirectToAddEmployeePage: true })}
            >
              Add Employee
            </button>

            <EmployeeList
              employees={this.props.employees}
              onDeleteClick={this.handleDeleteEmployee}
            />
          </>
        )}
      </>
    );
  }
}

EmployeesPage.propTypes = {
  skills: PropTypes.array.isRequired,
  employees: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    employees:
      state.skills.length === 0
        ? []
        : state.employees.map(employee => {
            return {
              ...employee,
              skillName: state.skills.find(a => a.id === employee.skillId).name
            };
          }),
    skills: state.skills,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadEmployees: bindActionCreators(
        employeeActions.loadEmployees,
        dispatch
      ),
      loadSkills: bindActionCreators(skillActions.loadSkills, dispatch),
      deleteEmployee: bindActionCreators(
        employeeActions.deleteEmployee,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesPage);
