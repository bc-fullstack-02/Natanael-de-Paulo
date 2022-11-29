import { Request, Response } from 'express';
import { CreateCommentService } from '../../services/comment/CreateCommentService';

class CreateCommentController {
	async handle(req: Request, res: Response){
		const { postId } = req.params;
		const { description } = req.body;
		const createCommentService  = new CreateCommentService();

		// if(!title) return res.status(400).json({ error: 'Title is required!'});
		// if(!description) return res.status(400).json({ error: 'Description is required!'});
		
		const newComment = await createCommentService.execute({postId, description}); 
		res.status(201).json(newComment);
	}
}

export const createCommentController = new CreateCommentController();