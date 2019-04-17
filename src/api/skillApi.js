import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/skills/";

export function getSkills() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveSkill(skill) {
  return fetch(baseUrl + (skill.id || ""), {
    method: skill.id ? "PUT" : "POST", // POST for create, PUT to update.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(skill)
  })
    .then(handleResponse)
    .catch(handleError);
}
export function deleteSkill(id) {
  return fetch(baseUrl + id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
