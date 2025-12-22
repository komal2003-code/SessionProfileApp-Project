let models = require("../models/regmodel.js");

class RegService {
    async acceptRegData(name, email, contact, username, password) {
        if (email.includes("@gmail.com")) {
            console.log("User data is:", name, email, contact, username, password);
            try {
                let result = await models.saveUser(name, email, contact, username, password);
                return result;
            } catch (error) {
                return "Failed to register: " + error;
            }
        } else {
            return "Invalid email (must be @gmail.com)";
        }
    }
}

module.exports = new RegService();
