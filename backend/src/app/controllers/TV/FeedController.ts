import { Request, Response } from "express";
import { compareAsc, format } from 'date-fns';

import Feed from '../../schemas/Feed';

class FeedController {
  async index(req: Request, res: Response) {
    const now = new Date();
    const feeds = await Feed.find({ date: '200' });
    return res.json(feeds);
  }
}

export default new FeedController();
