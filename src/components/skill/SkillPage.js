import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as skillActions from "../../redux/actions/skillActions";
import SkillList from "./SkillList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class SkillPage extends React.Component {
  state = {
    redirectToAddSkillPage: false
  };

  componentDidMount() {
    if (this.props.skills.length === 0) {
      this.props.actions.loadSkills().catch(error => {
        alert("Loading Skills failed" + error);
      });
    }
  }

  handleDeleteSkill = skill => {
    toast.success("Skill deleted");
    this.props.actions.deleteSkill(skill).catch(error => {
      toast.error("Delete Failed." + error.message, { autoClose: false });
    });
  };

  render() {
    return (
      <>
        {this.state.redirectToAddSkillPage && <Redirect to="/skill" />}
        <h2>SkillPage</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary"
              onClick={() => this.setState({ redirectToAddSkillPage: true })}
            >
              Add New Skill
            </button>

            <SkillList
              onDeleteClick={this.handleDeleteSkill}
              skills={this.props.skills}
            />
          </>
        )}
      </>
    );
  }
}

SkillPage.propTypes = {
  skills: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    skills: state.skills,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(skillActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillPage);
