import { CompanyEntity } from './entities/company.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyService extends TypeOrmCrudService<CompanyEntity> {
  constructor(@InjectRepository(CompanyEntity) repository) {
    super(repository);
  }
}
