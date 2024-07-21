const AdminModel = require("../models/admin-model.js");

class AdminRepository {
  async checkNewAdmin(email) {
    const existingAdmin = await AdminModel.findOne({
      $or: [{ email }],
    });
    return {
      message: "Can not update study",
      status: "failure",
      error: error,
    };
  }
}

module.exports = AdminRepository;
