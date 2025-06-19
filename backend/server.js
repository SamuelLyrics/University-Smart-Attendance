const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // your MySQL username
  password: '',        // your MySQL password
  database: 'attendance_db' // your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Example route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Example: Get all students
app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Example: Add a student
app.post('/students', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO students (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, name });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});