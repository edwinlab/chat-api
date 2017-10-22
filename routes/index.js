const Router = require('koa-router');
const authControllers = require('../controllers/auth');
const broadcastControllers = require('../controllers/broadcast');

const {
  login,
  register,
} = authControllers;

const {
  blast,
} = broadcastControllers;

const router = new Router();

router.get('/ping', async (ctx) => {
  ctx.body = 'pong';
});

router.post('/login', login);
router.post('/register', register);

router.post('/blast', blast);

module.exports = router;
