import { InputType } from '@nestjs/graphql';
import { PostsLikeInputDto } from '../../like/dto/post.like.dto';

@InputType()
export class PostsCollectInputDto extends PostsLikeInputDto {}
