import { Router } from 'express';
import { createUser, getUsers, patchUser, deleteUser } from '../controllers/userController';

const router = Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.patch('/users/:uid', patchUser);
router.delete('/users/:uid', deleteUser);

export default router;
