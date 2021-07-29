import { RequestWithCompanyId } from './../../CommonModule/types/request-with.id.type';
import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  Delete,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { CreateCompanyUserDTO } from '../dto/create-company-user.dto';
import { UpdateCompanyUserDTO } from '../dto/update-company-user.dto copy';
import { CompanyUserService } from '../service/company-user.service';
import { CompanyClientCredentialsGuard } from '../../CommonModule/guard/company-client-credentials.guard';

@Controller({
  path: '/user',
  version: '1',
})
export class CompanyUserController {
  constructor(private readonly companyUserService: CompanyUserService) {}

  @Post()
  @UseGuards(CompanyClientCredentialsGuard)
  public create(
    @Body() companyUser: CreateCompanyUserDTO,
    @Req() request: RequestWithCompanyId,
  ) {
    return this.companyUserService.create(request.companyId, companyUser);
  }

  @Get(':id')
  @UseGuards(CompanyClientCredentialsGuard)
  public findById(
    @Param('id') id: string,
    @Req() request: RequestWithCompanyId,
  ) {
    return this.companyUserService.findById(id, request.companyId);
  }

  @Put(':id')
  @UseGuards(CompanyClientCredentialsGuard)
  public update(
    @Param('id') id: string,
    @Body() companyUser: UpdateCompanyUserDTO,
    @Req() request: RequestWithCompanyId,
  ) {
    return this.companyUserService.update(id, request.companyId, companyUser);
  }

  @Delete(':id')
  @UseGuards(CompanyClientCredentialsGuard)
  public delete(@Param('id') id: string, @Req() request: RequestWithCompanyId) {
    this.companyUserService.delete(request.companyId, id);
  }

  @HttpCode(200)
  @Post('/:id/authorize')
  @UseGuards(CompanyClientCredentialsGuard)
  public authorizeUser(
    @Param('id') id: string,
    @Req() request: RequestWithCompanyId,
  ) {
    return this.companyUserService.authorizeUser(id, request.companyId);
  }
}
