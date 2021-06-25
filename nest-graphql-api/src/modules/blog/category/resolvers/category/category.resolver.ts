import { Query, Resolver } from '@nestjs/graphql';
import { CategoryEntity } from 'src/modules/blog/category/entities/category.entity';
import { CategoryService } from '../../services/category/category.service';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryEntity!]!, { description: '查询分类列表' })
  async categoryList(): Promise<CategoryEntity[]> {
    return await this.categoryService.categoryList();
  }
}
