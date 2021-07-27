import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../PrismaModule/service/prisma.service';
import { CreateActionDTO } from '../dto/create-action.dto';

@Injectable()
export class CompanyPermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  public async findActionById(actionId: string, companyId: string) {
    return this.prisma.action.findUnique({
      where: { id_companyId: { id: actionId, companyId } },
    });
  }

  public async createAction(companyId: string, action: CreateActionDTO) {
    return this.prisma.action.create({
      data: { ...action, companyId },
    });
  }

  public async deleteAction(companyId: string, action: CreateActionDTO) {
    return this.prisma.action.create({
      data: { ...action, companyId },
    });
  }

  public async updateActionAction(companyId: string, action: CreateActionDTO) {
    return this.prisma.action.create({
      data: { ...action, companyId },
    });
  }
}
