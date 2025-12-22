let conn = require("../config/db");

exports.saveUser = (...regData) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "INSERT INTO nureg VALUES('0', ?, ?, ?, ?, ?)",
            [...regData],
            (err, result) => {
                if (err) {
                    console.log("DB Error:", err);
                    return reject("Database error");
                } else {
                    console.log("Data inserted");
                    return resolve("Data inserted successfully");
                }
            }
        );
    });
};



exports.validateUserFromDB = (...user) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "SELECT * FROM nureg WHERE username=? AND password=?",
            [...user],
            (err, result) => {
                if (err) {
                    console.log("DB Error:", err);
                    return reject("Database error");
                } else {
                    console.log("User validation result:", result);
                    return resolve(result);
                }
            }
        );
    });
};

exports.getLoginUserProfile=((loginUserId)=>{
    console.log("Login user ID:",loginUserId);
    return new Promise((resolve,reject)=>{
        conn.query("SELECT * FROM nureg WHERE rid=?",[loginUserId],(err,result)=>{
            if(err){
                console.log("DB Error:",err);
                return reject("Database error");
            }
            else{
                console.log("User profile result:",result);
                return resolve(result);
            }
        });
    });
});
exports.updateUserProfile = (id, name, email, contact, username, password) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "UPDATE nureg SET name=?, email=?, contact=?, username=?, password=? WHERE rid=?",
            [name, email, contact, username, password, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};



