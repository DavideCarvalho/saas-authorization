import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyClientCredentialsGuard } from '../../CommonModule/guard/company-client-credentials.guard';
import { RequestWithCompanyId } from '../../CommonModule/types/request-with.id.type';
import { CompanyPermissionsService } from '../service/company-permissions.service';
import { CreateActionDTO } from '../dto/create-action.dto';

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
}
