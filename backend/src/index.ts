import express from 'express';
import cors from 'cors';
import { MySQLPlayerRepository } from './infrastructure/database/MySQLPlayerRepository';
import { MySQLCoachRepository } from './infrastructure/database/MySQLCoachRepository';
import { MySQLPostRepository } from './infrastructure/database/MySQLPostRepository';
import { PlayerController } from './presentation/controllers/PlayerController';
import { CoachController } from './presentation/controllers/CoachController';
import { PostController } from './presentation/controllers/PostController';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Repositories
const playerRepo = new MySQLPlayerRepository();
const coachRepo = new MySQLCoachRepository();
const postRepo = new MySQLPostRepository();

// Controllers
const playerController = new PlayerController(playerRepo);
const coachController = new CoachController(coachRepo);
const postController = new PostController(postRepo);

// Routes
app.get('/api/players', (req, res) => playerController.getAll(req, res));
app.post('/api/players', (req, res) => playerController.create(req, res));

app.get('/api/coaches', (req, res) => coachController.getAll(req, res));

app.get('/api/posts', (req, res) => postController.getAll(req, res));

// Debug route
import pool from './infrastructure/database/db';
app.get('/api/test-db', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        connection.release();
        res.json({ status: 'success', message: 'Connected to DB successfully' });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Connection failed',
            error: error instanceof Error ? error.message : error,
            env: {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USERNAME,
                db: process.env.DB_NAME
            }
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
