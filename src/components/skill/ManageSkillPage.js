import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as skillActions from "../../redux/actions/skillActions";
import SkillForm from "./SkillForm";
import { newSkill } from "../../../tools/mockData";
//import { saveSkill } from "../../api/skillApi";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const ManageSkillPage = ({
  skills,
  loadSkills,
  saveSkills,
  history,
  ...props
}) => {
  const [skill, setSkill] = useState({ ...props.skill });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (skills.length === 0) {
      loadSkills().catch(error => {
        alert("Loading Skills failed" + error);
      });
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setSkill(prevSkill => ({
      ...prevSkill,
      [name]: value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    saveSkills(skill).then(() => {
      toast.success("Skill saved");
      history.push("/skills");
    });
  }

  return skills.length === 0 ? (
    <Spinner />
  ) : (
    <SkillForm
      skill={skill}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageSkillPage.propTypes = {
  skill: PropTypes.object.isRequired,
  skills: PropTypes.array.isRequired,
  loadSkills: PropTypes.func.isRequired,
  saveSkills: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getSkillById(skills, id) {
  return skills.find(skill => skill.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id);
  const skill =
    id && state.skills.length > 0 ? getSkillById(state.skills, id) : newSkill;
  return {
    skill: skill,
    skills: state.skills
  };
}

const mapDispatchToProps = {
  loadSkills: skillActions.loadSkills,
  saveSkills: skillActions.saveSkills
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageSkillPage);
