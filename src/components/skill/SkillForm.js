import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const SkillForm = ({
  skill,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{skill.id ? "Edit" : "Add"} Skill</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Skill"
        value={skill.name}
        onChange={onChange}
        error={errors.name}
      />

      <TextInput
        name="description"
        label="Description"
        value={skill.description}
        onChange={onChange}
        error={errors.description}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

SkillForm.propTypes = {
  skill: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default SkillForm;
