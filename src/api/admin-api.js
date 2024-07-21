const AdminServices = require("../services/admin-services");

module.exports = (app) => {
  const adminServices = new AdminServices();

  app.post("/admin/signup", async (req, res) => {
    try {
      const response = await adminServices.registerAdmin(req);
    } catch (error) {
      res.status(500).json({
        message: "Can not update study",
        status: "failure",
        error: error,
      });
    }
  });

};
