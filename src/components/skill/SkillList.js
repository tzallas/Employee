import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SkillList = ({ skills, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Skills</th>
        <th>Description</th>
        <th />
        <th />
      </tr>
    </thead>
    <tbody>
      {skills.map(skill => {
        return (
          <tr key={skill.name + skill.id}>
            <td>{skill.name}</td>
            <td>{skill.description}</td>
            <td>
              <Link
                to={"/skill/" + skill.id}
                className="btn btn-outline-primary"
              >
                {" "}
                Edit
              </Link>
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(skill)}
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

SkillList.propTypes = {
  skills: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default SkillList;
