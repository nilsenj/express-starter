import express from 'express';
import {UsersController} from '../controllers/users-controller';

let router = express.Router();

/* GET users listing. */
router.get('/', UsersController.index);
router.get('/show/:id', UsersController.show);

module.exports = router;
