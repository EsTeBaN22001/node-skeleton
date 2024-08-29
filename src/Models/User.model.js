import { pool } from '../db.js'

export class UserModel {
  static table = 'users'

  static async registerUser({ name, username, password }) {
    try {
      const [result] = await pool.query(`INSERT INTO ${this.table} (name, username, password) VALUES (?, ?, ?)`, [
        name,
        username,
        password
      ])

      if (!result || result.affectedRows <= 0) {
        return false
      }

      return {
        id: result.insertId,
        name,
        username
      }
    } catch (err) {
      return { success: false, err }
    }
  }

  static async userExistsByUsername(username) {
    try {
      const [result] = await pool.query(`SELECT * FROM ${this.table} WHERE username = ?`, [username])

      if (result.length > 0) {
        return result[0]
      }

      return false
    } catch (error) {
      return { success: false, error }
    }
  }
}
