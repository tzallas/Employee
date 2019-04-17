import * as types from "./actionTypes";
import * as employeeApi from "../../api/employeeApi";
import { beginApiCall } from "./apiStatusActions";

export function loadEmployeeSuccess(employees) {
  return { type: types.LOAD_EMPLOYEES_SUCCESS, employees };
}

export function createEmployeeSuccess(employee) {
  return { type: types.CREATE_EMPLOYEE_SUCCESS, employee };
}

export function updateEmployeeSuccess(employee) {
  return { type: types.UPDATE_EMPLOYEE_SUCCESS, employee };
}

export function loadEmployees() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return employeeApi
      .getEmployees()
      .then(employees => {
        dispatch(loadEmployeeSuccess(employees));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveEmployee(employee) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return employeeApi
      .saveEmployee(employee)
      .then(savedEmployee => {
        employee.id
          ? dispatch(updateEmployeeSuccess(savedEmployee))
          : dispatch(createEmployeeSuccess(savedEmployee));
      })
      .catch(error => {
        throw error;
      });
  };
}
export function deleteEmployeeOptimistic(employee) {
  return { type: types.DELETE_EMPLOYEE_OPTIMISTIC, employee };
}

export function deleteEmployee(employee) {
  return function(dispatch) {
    dispatch(deleteEmployeeOptimistic(employee));
    return employeeApi.deleteEmployee(employee.id);
  };
}
