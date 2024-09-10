const Router = require("express");

const router = Router();

const {
  projectDepartment,
  addproject,
  projectsFind,
  projects,
  update,
} = require("../controller/project.controller.js");

router.route("/projects/department-summary").get(projectDepartment);

router.route("/addproject").post(addproject);

router.route("/projects").get(projectsFind);

router.route("/projects").get(projects);

router.route("/project/:id/status").put(update);

module.exports = router;
