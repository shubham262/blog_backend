const AdminRepository = require("../DB/repository/admin-db-repo");

class AdminServices {
  constructor() {
    this.repository = new AdminRepository();
  }

  async registerAdmin(req) {
    try {
      const check = await this.repository.checkNewAdmin(req);
      return response
    } catch (error) {
      return {
        message: "Can not update study",
        status: "failure",
        error: error,
      };
    }
  }

}

module.exports = AdminServices;
