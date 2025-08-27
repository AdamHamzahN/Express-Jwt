const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
if(!jwtSecret) throw new Error('JWT belum ada')

const SALT_ROUNDS = 10; // bcrypt formula

module.exports = {
    // post /api/auth/register
    register: async (req, res, next) => {
        try {
            const { email, password, name } = req.body;

            // validasi
            if (!email || !password) {
                return res.status(400).json({ message: "Email dan Password tidak boleh kosong" });

            }
            if (password.length < 6) {
                return res.status(400).json({ message: "Password minimal 6 karakter" });
            }

            // cek apakah user sudah ada
            const [existing] = await pool.execute('SELECT id FROM users where email = ?', [email]);
            if (existing > 0) {
                return res.status(409).json({ message: "Email tersebut sudah terdaftar" });
            }

            // Hash Password
            const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);

            // insert user 
            const [result] = await pool.execute('INSERT INTO users (email,name,password) values (?, ?, ?)', [email, name || null, hashed_password]);

            // tampilkan data yang baru saja di insert
            return res.status(201).json({ id: result.insertId, email, name: name });

        } catch (e) {
            next(e);
        }
    },

    // Post /api/auth/login
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // validasi
            if (!email || !password) {
                return res.status(400).json({ message: "Email dan Password tidak boleh kosong" });
            }

            // ambil data user
            const [rows] = await pool.execute('SELECT * FROM users where email = ?', [email]);

            // cek apakah user ada ?
            if (rows.length === 0) res.status(401).json({ message: "Invalid credential" });

            // ambil data user yang ada
            const user = rows[0];

            // membandingkan password dengan yg ada di database
            const match = await bcrypt.compare(password, user.password);

            // jika tidak cocok
            if (!match) {
                res.status(401).json({ message: "password salah" });
            }

            // generate JWT sign JWT (jangan simpan password ke payload)
            const payload = { id: user.id, email: user.email }

            // Buat tokennya
            const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

            // Kembalikan token di return
            return res.status(200).json({
                message: "Berhasil login",
                token,
                user: { id: user.id, email: user.email, name: user.name }
            });
        } catch (e) {
            next(e);
        }
    }
}