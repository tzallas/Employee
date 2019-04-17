import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EmployeeList = ({ employees, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Skills</th>
        <th />
        <th />
      </tr>
    </thead>
    <tbody>
      {employees.map(employee => {
        return (
          <tr key={employee.id}>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.skillName}</td>
            <td>
              <Link
                to={"/employee/" + employee.slug}
                className="btn btn-outline-primary"
              >
                {" "}
                Edit
              </Link>
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(employee)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

EmployeeList.propTypes = {
  employees: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default EmployeeList;
