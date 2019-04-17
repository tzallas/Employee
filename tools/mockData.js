const employees = [
  {
    id: 1,
    firstName: "Rachell",
    slug: "slug1",
    skillId: 1,
    lastName: "Hovland"
  },
  {
    id: 2,
    firstName: "Dana",
    slug: "slug2",
    skillId: 3,
    lastName: "Arwood"
  },
  {
    id: 3,
    firstName: "Kimberlie",
    slug: "slug3",
    skillId: 2,
    lastName: "Beier"
  }
];

const skills = [
  {
    id: 1,
    name: "Devops",
    description: "Managing infrastructure"
  },
  {
    id: 2,
    name: "Backend Developer",
    description: "Develop server-side applications"
  },
  {
    id: 3,
    name: "Frontend Developer",
    description: "Develop client-side applications"
  }
];

const newEmployee = {
  id: null,
  firstName: "",
  skillId: null,
  lastName: ""
};

const newSkill = {
  id: null,
  name: "",
  description: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newSkill,
  newEmployee,
  employees,
  skills
};
