import { Post } from '../../models/Post';
import { User } from '../../models/User';

interface IProps {
  post_id: string;
  user_id: string;
}

class UnlikePostService {
	async execute({post_id, user_id}: IProps) { 

		const user = await User.findById(user_id).populate('profile');
		const postLiked = Post.findByIdAndUpdate({_id: post_id}, {$pull: {likes: user?.profile._id}}, { runValidators: true, new: true});

		return postLiked;
	}
}

export { UnlikePostService };