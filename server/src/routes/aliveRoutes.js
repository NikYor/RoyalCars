import { Router } from 'express';
const aliveRouter = Router();

const alive = (req, res) => {
  res.status(200).json({message: 'Alive'})
}

aliveRouter.get('/', alive);

export default aliveRouter;