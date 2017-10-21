const Router = require('koa-router');
const authControllers = require('../controllers/auth');

const {
  login,
  register,
} = authControllers;

const router = new Router();

router.get('/ping', async (ctx) => {
  ctx.body = 'pong';
});

router.post('/login', login);
router.post('/register', register);

module.exports = router;
