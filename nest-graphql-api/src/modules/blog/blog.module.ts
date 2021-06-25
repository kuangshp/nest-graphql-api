import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category/entities/category.entity';
import { CollectEntity } from './posts/entities/collect.entity';
import { PostsEntity } from './posts/entities/posts.entity';
import { UserEntity } from './user/entities/user.entity';
import { UserResolver } from './user/resolvers/user/user.resolver';
import { PostsResolver } from './posts/resolvers/posts/posts.resolver';
import { CategoryResolver } from './category/resolvers/category/category.resolver';
import { UserService } from './user/services/user/user.service';
import { LoginResolver } from './user/resolvers/login/login.resolver';
import { RegisterResolver } from './user/resolvers/register/register.resolver';
import { LoginService } from './user/services/login/login.service';
import { RegisterService } from './user/services/register/register.service';
import { UserTokenEntity } from './user/entities/user.token.entity';
import { SmsResolver } from './sms/resolvers/sms.resolver';
import { PostsService } from './posts/services/posts/posts.service';
import { LikeEntity } from './posts/entities/like.entity';
import { CommentEntity } from './posts/entities/comment.entity';
import { LikeResolver } from './posts/resolvers/like/like.resolver';
import { CollectResolver } from './posts/resolvers/collect/collect.resolver';
import { CollectService } from './posts/services/collect/collect.service';
import { LikeService } from './posts/services/like/like.service';
import { CommentService } from './posts/services/comment/comment.service';
import { CommentResolver } from './posts/resolvers/comment/comment.resolver';
import { UserAttentionEntity } from './user/entities/user.attention.entity';
import { AttentionResolver } from './user/resolvers/attention/attention.resolver';
import { AttentionService } from './user/services/attention/attention.service';
import { CategoryService } from './category/services/category/category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PostsEntity,
      CategoryEntity,
      CollectEntity,
      CommentEntity,
      LikeEntity,
      UserTokenEntity,
      UserAttentionEntity,
    ]),
  ],
  providers: [
    UserResolver,
    PostsResolver,
    CategoryResolver,
    UserService,
    LoginResolver,
    RegisterResolver,
    LoginService,
    RegisterService,
    SmsResolver,
    PostsService,
    LikeResolver,
    CollectResolver,
    CollectService,
    LikeService,
    CommentService,
    CommentResolver,
    AttentionResolver,
    AttentionService,
    CategoryService,
  ],
})
export class BlogModule {}
