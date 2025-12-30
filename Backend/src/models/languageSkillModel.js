const { db } = require('./db');

class LanguageSkillModel {

    static addLanguageSkill(data) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO language_skill(employee_id,language_id,language_level_id) VALUES(?,?,?)`

            db.run(sql, data, (err) => {
                if (err) return reject(err);
                resolve();
            })
        })
    }

    static findLanguageSkillByEmpId(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT ls.language_id, ls.language_level_id FROM language_skill AS ls ` +
                `INNER JOIN employee AS e ON e.id=ls.employee_id ` +
                `WHERE e.id=?`;

            db.all(sql, [id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            })
        })
    }

    static findLanguageSkillByEmpIdANDLevelID(empId, language_id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id FROM language_skill ` +
                `WHERE employee_id=? AND language_id=?`;

            db.get(sql, [empId, language_id], (err, row) => {
                if (err) return reject(err);
                resolve(row.id);
            })
        })
    }

    static existsLanguage(language_id, empId) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT 1 FROM language_skill ` +
                `WHERE EXISTS(SELECT * FROM language_skill WHERE language_id=? AND employee_id=?)`;

            db.get(sql, [language_id, empId], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            })
        })
    }

    static existsLanguageLevel(language_id, language_level_id, empId) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT 1 FROM language_skill ` +
                `WHERE EXISTS(SELECT * FROM language_skill WHERE language_id=? AND language_level_id=? AND employee_id=?)`;

            db.get(sql, [language_id, language_level_id, empId], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            })
        })
    }
    static createLanguageSkil(data) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO language_skill(employee_id, language_id, language_level_id) VALUES(?,?,?)`
            db.run(sql, data, function (err) {
                if (err) return reject(err);
                resolve(this.lastID);
            });
        });
    }

    static addLanguageSkill(sql, data) {
        return new Promise((resolve, reject) => {
            db.run(sql, data, function (err) {
                if (err) return reject(err);
                resolve(this.lastID);
            });
        });
    }

    static updateLanguageSkill(sql, data) {
        return new Promise((resolve, reject) => {
            db.run(sql, data, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

module.exports = LanguageSkillModel;