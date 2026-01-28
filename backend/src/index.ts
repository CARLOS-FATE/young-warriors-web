import express from 'express';
import cors from 'cors';
import { MySQLPlayerRepository } from './infrastructure/database/MySQLPlayerRepository';
import { MySQLCoachRepository } from './infrastructure/database/MySQLCoachRepository';
import { MySQLPostRepository } from './infrastructure/database/MySQLPostRepository';
import { PlayerController } from './presentation/controllers/PlayerController';
import { CoachController } from './presentation/controllers/CoachController';
import { PostController } from './presentation/controllers/PostController';
import { AuthController } from './presentation/controllers/AuthController';
import { MySQLAdminRepository } from './infrastructure/database/MySQLAdminRepository';
import { MySQLAdVideoRepository } from './infrastructure/database/MySQLAdVideoRepository';
import { authenticateToken } from './infrastructure/auth/AuthMiddleware';
import { AdVideoController } from './presentation/controllers/AdVideoController';
import { ensureAdminExists } from './infrastructure/database/ensure-admin';
import { MySQLPricingRepository } from './infrastructure/database/MySQLPricingRepository';
import { PricingController } from './presentation/controllers/PricingController';
import { MySQLAttendanceRepository } from './infrastructure/database/MySQLAttendanceRepository';
import { AttendanceController } from './presentation/controllers/AttendanceController';


const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Repositories

const playerRepo = new MySQLPlayerRepository();
const coachRepo = new MySQLCoachRepository();
const postRepo = new MySQLPostRepository();
const adminRepo = new MySQLAdminRepository();

const adVideoRepo = new MySQLAdVideoRepository();
const pricingRepo = new MySQLPricingRepository();
const attendanceRepo = new MySQLAttendanceRepository();


// Controllers
const playerController = new PlayerController(playerRepo);
const coachController = new CoachController(coachRepo);
const postController = new PostController(postRepo);
const authController = new AuthController(adminRepo);

const adVideoController = new AdVideoController(adVideoRepo);
const pricingController = new PricingController(pricingRepo);
const attendanceController = new AttendanceController(attendanceRepo);

// Routes
app.get('/api/players', (req, res) => playerController.getAll(req, res));
app.post('/api/players', authenticateToken, (req, res) => playerController.create(req, res));
app.put('/api/players/:id', authenticateToken, (req, res) => playerController.update(req, res));
app.delete('/api/players/:id', authenticateToken, (req, res) => playerController.delete(req, res));

app.get('/api/coaches', (req, res) => coachController.getAll(req, res));
app.post('/api/coaches', authenticateToken, (req, res) => coachController.create(req, res));
app.put('/api/coaches/:id', authenticateToken, (req, res) => coachController.update(req, res));
app.delete('/api/coaches/:id', authenticateToken, (req, res) => coachController.delete(req, res));

app.get('/api/posts', (req, res) => postController.getAll(req, res));
app.post('/api/posts', authenticateToken, (req, res) => postController.create(req, res));
app.put('/api/posts/:id', authenticateToken, (req, res) => postController.update(req, res));
app.delete('/api/posts/:id', authenticateToken, (req, res) => postController.delete(req, res));

// Ad Video Routes
app.get('/api/ad-videos', (req, res) => adVideoController.getAll(req, res));
app.post('/api/ad-videos', authenticateToken, (req, res) => adVideoController.create(req, res));
app.delete('/api/ad-videos/:id', authenticateToken, (req, res) => adVideoController.delete(req, res));

// Pricing Routes
app.get('/api/pricing', (req, res) => pricingController.getAll(req, res));
app.post('/api/pricing', authenticateToken, (req, res) => pricingController.create(req, res));
app.put('/api/pricing/:id', authenticateToken, (req, res) => pricingController.update(req, res));
app.delete('/api/pricing/:id', authenticateToken, (req, res) => pricingController.delete(req, res));

// Attendance Routes
app.get('/api/attendance', authenticateToken, (req, res) => attendanceController.getByDate(req, res));
app.post('/api/attendance', authenticateToken, (req, res) => attendanceController.upsert(req, res));


// Auth Routes
app.post('/api/auth/login', (req, res) => authController.login(req, res));

// Protected Route Example (will be used for CRUD)
// app.post('/api/players', authenticateToken, (req, res) => playerController.create(req, res));

app.listen(port, async () => {
    await ensureAdminExists(); // Auto-seed admin if missing
    console.log(`Server running on port ${port}`);
});
