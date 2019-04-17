import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/employees/";

export function getEmployees() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveEmployee(employee) {
  return fetch(baseUrl + (employee.id || ""), {
    method: employee.id ? "PUT" : "POST", // POST for create, PUT to update.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(employee)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteEmployee(employeeId) {
  return fetch(baseUrl + employeeId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
