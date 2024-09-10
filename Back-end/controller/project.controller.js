const Project = require("../models/newProjectSchema.js");

const projectDepartment = async (req, res) => {
  try {
    const departments = ["STR", "FIN", "QLT", "MAN", "STO", "HR"];

    const projectSummary = await Promise.all(
      departments.map(async (department) => {
        const totalProjects = await Project.countDocuments({ department });
        const closedProjects = await Project.countDocuments({
          department,
          status: "Closed",
        });

        return {
          department,
          totalProjects,
          closedProjects,
        };
      })
    );

    res.json(projectSummary);
  } catch (error) {
    res.status(500).send("Error fetching project summary");
  }
};

// Route to save a project
const addproject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ message: "Project saved successfully!" });
  } catch (error) {
    console.error("Error saving project:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the project." });
  }
};

// Get all projects
const projectsFind = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving projects", error });
  }
};

// route to display 8 document on each page.
const projects = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  try {
    const projects = await Project.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalProjects = await Project.countDocuments();
    res.json({
      projects,
      totalPages: Math.ceil(totalProjects / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// Update project status
const update = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error updating project status", error });
  }
};

module.exports = {
  projectDepartment,
  addproject,
  update,
  projects,
  projectsFind,
};
