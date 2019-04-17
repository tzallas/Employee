import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const EmployeeForm = ({
  employee,
  skills,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{employee.id ? "Edit" : "Add"} Employee</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="firstName"
        label="First Name"
        value={employee.firstName}
        onChange={onChange}
        error={errors.firstName}
      />

      <TextInput
        name="lastName"
        label="Last Name"
        value={employee.lastName}
        onChange={onChange}
        error={errors.lastName}
      />
      <SelectInput
        name="skillId"
        label="Skill"
        value={employee.skillId || ""}
        defaultOption="Select Skill"
        options={skills.map(skill => ({
          value: skill.id,
          text: skill.name
        }))}
        onChange={onChange}
        error={errors.skill}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

EmployeeForm.propTypes = {
  skills: PropTypes.array.isRequired,
  employee: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default EmployeeForm;
