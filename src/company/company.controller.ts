import { ApiTags } from '@nestjs/swagger';
import { CompanyEntity } from './entities/company.entity';
import { Controller } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Crud } from '@nestjsx/crud';
import { CreateCompanyDto } from './dto/create-company.dto';

@ApiTags('Company')
@Crud({
  model: {
    type: CompanyEntity,
  },
  routes: {
    exclude: ['getOneBase'],
  },
  dto: {
    create: CreateCompanyDto,
  },
})
@Controller('company')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}
}
