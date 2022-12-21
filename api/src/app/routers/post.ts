import { Router } from 'express';
import { createPostController } from '../controllers/post/CreatePostController';
import { deletePostController } from '../controllers/post/DeletePostController';
import { listPostController } from '../controllers/post/ListPostController';
import { listPostByIdController } from '../controllers/post/ListPostByIdController';
import { updatePostController } from '../controllers/post/UpdatePostController';
import { likeAndUnlikePostController} from '../controllers/post/LikeAndUnlikePostController';

export const PostRoutes = Router();

PostRoutes
	.route('/')
	.get(listPostController.handle)
	.post(createPostController.handle);

PostRoutes
	.route('/:post_id')
	.get(listPostByIdController.handle)
	.delete(deletePostController.handle)
	.put(updatePostController.handle);

PostRoutes
	.route('/:post_id/like')
	.post(likeAndUnlikePostController.handle);
	
//{id}/like
//Criar rota para dar like em um determinado post