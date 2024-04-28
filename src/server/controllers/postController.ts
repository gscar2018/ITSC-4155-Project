import { Request, Response } from 'express';
import { PostModel } from '../schemas/Post.ts';


//searching posts by tag
export const searchPostsByTags = async (req: Request, res: Response) => {
    const { tags } = req.query;
    
    try {
      const posts = await PostModel.find({ tags: { $in: tags } });
      res.json(posts);
    } catch (error) {
      console.error('Error searching posts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };