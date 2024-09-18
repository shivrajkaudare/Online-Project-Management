// Route to fetch dashboard stats.

const Project = require("../models/newProjectSchema.js");

const dashboard = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const closedProjects = await Project.countDocuments({ status: "Closed" });
    const runningProjects = await Project.countDocuments({ status: "Running" });
    const closureDelayProjects = await Project.countDocuments({
      status: "Closure Delay",
    });
    const cancelledProjects = await Project.countDocuments({
      status: "Cancelled",
    });

    res.json({
      totalProjects,
      closedProjects,
      runningProjects,
      closureDelayProjects,
      cancelledProjects,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};

module.exports = { dashboard };
