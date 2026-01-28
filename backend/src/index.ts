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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
