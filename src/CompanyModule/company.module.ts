import { Module } from '@nestjs/common';
import { CompanyPermissionsController } from './controller/company-permissions.controller';
import { CompanyUserController } from './controller/company-user.controller';
import { CompanyUserService } from './service/company-user.service';
import { CompanyPermissionsService } from './service/company-permissions.service';

@Module({
  imports: [],
  controllers: [CompanyUserController, CompanyPermissionsController],
  providers: [CompanyUserService, CompanyPermissionsService],
})
export class CompanyModule {}
