import { CategoryEntity } from './../../../blog/category/entities/category.entity';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InitDbService implements OnModuleInit {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  onModuleInit() {
    console.log('初始化数据库');
    this.initCategoryData();
  }

  async initCategoryData(): Promise<void> {
    const categoryList = [
      {
        name: '文学',
      },
      {
        name: '编程',
      },
      {
        name: '小说',
      },
      {
        name: '动画',
      },
      {
        name: '儿童',
      },
    ];
    const category = await this.categoryRepository.find();
    if (!category) {
      // 将数据插入到数据库中
      await this.categoryRepository.insert(categoryList);
    }
  }
}
