import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyClientCredentialsGuard } from '../../CommonModule/guard/company-client-credentials.guard';
import { RequestWithCompanyId } from '../../CommonModule/types/request-with.id.type';
import { CompanyPermissionsService } from '../service/company-permissions.service';
import { CreateActionDTO } from '../dto/create-action.dto';
import { UpdateActionDTO } from '../dto/update-action.dto';
import { CreateRoleDTO } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Controller({
  path: 'permissions',
  version: '1',
})
export class CompanyPermissionsController {
  constructor(private readonly service: CompanyPermissionsService) {}

  @Post('/action')
  @UseGuards(CompanyClientCredentialsGuard)
  public async createAction(
    @Body() action: CreateActionDTO,
    @Req() request: RequestWithCompanyId,
  ) {
    return this.service.createAction(request.companyId, action);
  }

  @Get('/action/:id')
  @UseGuards(CompanyClientCredentialsGuard)
  public async findActionById(
    @Param('id') id: string,
    @Req() request: RequestWithCompanyId,
  ) {
    return this.service.findActionById(request.companyId, id);
  }

  @Put('/action/:id')
  @UseGuards(CompanyClientCredentialsGuard)
  public async updateAction(
    @Param('id') id: string,
    @Body() action: UpdateActionDTO,
    @Req() request: RequestWithCompanyId,
  ) {
    return this.service.updateAction(id, request.companyId, action);
  }

  @Delete('/action/:id')
  @UseGuards(CompanyClientCredentialsGuard)
  public async deleteAction(
    @Param('id') id: string,
    @Req() request: RequestWithCompanyId,
  ) {
    await this.service.deleteAction(request.companyId, id);
  }

  @Post('/role')
  @UseGuards(CompanyClientCredentialsGuard)
  public async createRole(
    @Body() role: CreateRoleDTO,
    @Req() request: RequestWithCompanyId,
  ) {
    return this.service.createRole(request.companyId, role);
  }

  @Get('/role/:id')
  @UseGuards(CompanyClientCredentialsGuard)
  public async findRoleById(
    @Param('id') id: string,
    @Req() request: RequestWithCompanyId,
  ) {
    return this.service.findRoleById(id, request.companyId);
  }

  @Put('/role/:id')
  @UseGuards(CompanyClientCredentialsGuard)
  public async updateRole(
    @Param('id') id: string,
    @Body() role: UpdateRoleDto,
    @Req() request: RequestWithCompanyId,
  ) {
    return this.service.updateRole(id, request.companyId, role);
  }

  @Delete('/role/:id')
  @UseGuards(CompanyClientCredentialsGuard)
  public async deleteRole(
    @Param('id') id: string,
    @Req() request: RequestWithCompanyId,
  ) {
    await this.service.deleteRole(id, request.companyId);
  }
}
