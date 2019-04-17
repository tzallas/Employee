import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadEmployees,
  saveEmployee
} from "../../redux/actions/employeeActions";
import { loadSkills } from "../../redux/actions/skillActions";
import PropTypes from "prop-types";
import EmployeeForm from "./EmployeeForm";
import { newEmployee } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageEmployeePage({
  employees,
  skills,
  loadSkills,
  loadEmployees,
  saveEmployee,
  history,
  ...props
}) {
  const [employee, setEmployee] = useState({ ...props.employee });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (employees.length === 0) {
      loadEmployees().catch(error => {
        alert("Loading employees failed" + error);
      });
    } else {
      setEmployee({ ...props.employee });
    }

    if (skills.length === 0) {
      loadSkills().catch(error => {
        alert("Loading skills failed" + error);
      });
    }
  }, [props.employee]);

  function handleChange(event) {
    const { name, value } = event.target;
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: name === "skillId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    saveEmployee(employee).then(() => {
      toast.success("employee saved");
      history.push("/employees");
    });
  }

  return skills.length === 0 || employees.length === 0 ? (
    <Spinner />
  ) : (
    <EmployeeForm
      employee={employee}
      errors={errors}
      skills={skills}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageEmployeePage.propTypes = {
  employee: PropTypes.object.isRequired,
  skills: PropTypes.array.isRequired,
  employees: PropTypes.array.isRequired,
  loadEmployees: PropTypes.func.isRequired,
  loadSkills: PropTypes.func.isRequired,
  saveEmployee: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getEmployeeBySlug(employees, slug) {
  return employees.find(employee => employee.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const employee =
    slug && state.employees.length > 0
      ? getEmployeeBySlug(state.employees, slug)
      : newEmployee;
  return {
    employee,
    employees: state.employees,
    skills: state.skills
  };
}

const mapDispatchToProps = {
  loadEmployees,
  loadSkills,
  saveEmployee
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageEmployeePage);
