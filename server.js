import express from 'express';
import { createPool } from 'mysql2/promise';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

const db = createPool({
  host: 'localhost',
  user: 'thulasi', 
  password: 'thulasi',
  database: 'materials',
});

(async () => {
  try {
    const connection = await db.getConnection();
    await connection.ping();
    connection.release();
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
})();

const storage = multer.diskStorage({
  destination: async (req,file,cb) => {
    const uploadDir = path.join(__dirname, 'public', 'images');
    try {
      await fs.promises.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      cb(err, null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post('/addtag', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).send('No file uploaded');
    }
    const image = `images/${req.file.filename}`; 
    const { tag,objective, count } = req.body;

    console.log('Received values:', { tag,objective, count, image });

    if (!tag || !count || !objective) {
      console.error('Tag and count are required');
      return res.status(400).send('Tag and count are required');
    }

    const connection = await db.getConnection();
    const sql = 'INSERT INTO subject_tags (tag,objective, count, image) VALUES (?,?, ?, ?)';
    
    await connection.execute(sql, [tag,objective, count, image]);
    connection.release();
    console.log("Tag added successfully");
    res.status(201).json({ message: 'Tag added successfully', filePath: image });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

app.get('/newpage', (req, res) => {
  res.send('You have been redirected to the new page');
});

app.post('/addlevel', async (req, res) => {
  try {
    const { main_id,content, level } = req.body;
  
    console.log('Received values:', {main_id, content, level });

    if (!main_id || !content || !level) {
      console.error('Content and level are required');
      return res.status(400).send('Content and level are required');
    }

    const connection = await db.getConnection();
    const sql = 'INSERT INTO content (main_id,content, level) VALUES (?,?, ?)';
    
    await connection.execute(sql, [main_id,content, level]);
    connection.release();
    console.log("Level added successfully");
    res.status(201).json({ message: 'Level added successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});


app.get('/tags', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.query('SELECT * FROM subject_tags');
    
    connection.release();
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});
app.get('/addlevel',async(req,res)=>{
  try{
  const connection = await db.getConnection();
    const [rows] = await connection.query('SELECT * FROM content');
    
    connection.release();
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
})

app.get('/addcontent',async(req,res)=>{
  try{
  const connection = await db.getConnection();
    const [rows] = await connection.query('SELECT * FROM content');
    
    connection.release();
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
