const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(express.json());
const jwt = require("jsonwebtoken");
const pool = require("../config/database");
const secretKey = "my_secret_key";
//Router login
router.use(bodyParser.json());

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const payload = { email };
  const accessToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  global.accessToken = accessToken;

  pool.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (error, results) => {
      if (error) throw error;
      if (results.length === 0) {
        res.status(401).send("Tên đăng nhập hoặc mật khẩu không chính xác");
        return;
      }
      res.send("Đăng nhập thành công");
    }
  );
});

router.post("/register", (req, res) => {
  const { id, name, email, password } = req.body;

  pool.query("SELECT * FROM users WHERE email=?", [email], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      res.status(409).send("Email da ton tai, vui long nhap email khac");
      return;
    } else {
      pool.query(
        "INSERT INTO users(id,name,email,password) VALUES (?,?,?,?)",
        [id, name, email, password],
        (error, results) => {
          if (error) throw error;

          res.send("SignUp success");
        }
      );
    }
  });
});

router.get("/listUser", (req,res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) throw error;

    res.json(results);
  });
});

router.get("/listUsernoPassword", (req, res) => {
  pool.query(
    "SELECT id,name,email,create_at,update_at FROM users",
    (error, results) => {
      if (error) throw error;

      res.json(results);
    }
  );
});
router.post("/logout", (req, res) => {
  global.accessToken = null;
  res.send("Đã đăng xuất");
});

module.exports = router;
