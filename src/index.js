import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // your MySQL username
  password: 'Lyrics12',        // your MySQL password
  database: 'attendance_db' // your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Get all students
app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add a student
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

// Client-side code (to be used in your frontend JavaScript)
// Get all students
fetch('http://localhost:5000/students')
  .then(res => res.json())
  .then(data => {
    console.log(data); // Use this data in your UI
  })
  .catch(err => console.error(err));

// Add a student
fetch('http://localhost:5000/students', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Jane Doe' })
})
  .then(res => res.json())
  .then(data => {
    console.log('Student added:', data);
  })
  .catch(err => console.error(err));