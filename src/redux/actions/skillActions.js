import * as types from "./actionTypes";
import * as skillApi from "../../api/skillApi";
import { beginApiCall } from "./apiStatusActions";

export function loadSkillsSuccess(skills) {
  return { type: types.LOAD_SKILLS_SUCCESS, skills: skills };
}

export function loadSkills() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return skillApi
      .getSkills()
      .then(skills => {
        dispatch(loadSkillsSuccess(skills));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function createSkillSuccess(skill) {
  return { type: types.CREATE_SKILL_SUCCESS, skill: skill };
}

export function updateSkillSuccess(skill) {
  return { type: types.UPDATE_SKILL_SUCCESS, skill: skill };
}

export function saveSkills(skill) {
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return skillApi
      .saveSkill(skill)
      .then(savedSkill => {
        skill.id
          ? dispatch(updateSkillSuccess(savedSkill))
          : dispatch(createSkillSuccess(savedSkill));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteSkillOptimistic(skill) {
  return { type: types.DELETE_SKILL_OPTIMISTIC, skill };
}

export function deleteSkill(skill) {
  return function(dispatch) {
    dispatch(deleteSkillOptimistic(skill));
    return skillApi.deleteSkill(skill.id);
  };
}
