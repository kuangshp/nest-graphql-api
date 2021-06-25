import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/modules/blog/category/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  /**
   * @Author: 水痕
   * @Date: 2021-06-17 14:16:43
   * @LastEditors: 水痕
   * @Description: 查询分类列表
   * @param {*}
   * @return {*}
   */
  async categoryList(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }
}
