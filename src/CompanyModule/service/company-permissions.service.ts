import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../PrismaModule/service/prisma.service';
import { CreateActionDTO } from '../dto/create-action.dto';
import { UpdateActionDTO } from '../dto/update-action.dto';
import { CreateRoleDTO } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

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

  public async updateAction(
    actionId: string,
    companyId: string,
    action: UpdateActionDTO,
  ) {
    return this.prisma.action.update({
      where: { id_companyId: { id: actionId, companyId } },
      data: { ...action, companyId },
    });
  }

  public async deleteAction(actionId: string, companyId: string) {
    return this.prisma.action.delete({
      where: { id_companyId: { id: actionId, companyId } },
    });
  }

  public async createRole(companyId: string, role: CreateRoleDTO) {
    const actions = role.actionsIds.map((actionId: string) => ({
      id: actionId,
      companyId,
    }));

    return this.prisma.role.create({
      data: {
        ...role,
        companyId,
        Actions: {
          connect: actions,
        },
      },
    });
  }

  public async findRoleById(roleId: string, companyId: string) {
    return this.prisma.role.findUnique({
      where: { id_companyId: { id: roleId, companyId } },
    });
  }

  public async deleteRole(roleId: string, companyId: string) {
    this.prisma.role.delete({
      where: { id_companyId: { id: roleId, companyId } },
    });
  }

  public async updateRole(
    roleId: string,
    companyId: string,
    updatedRole: UpdateRoleDto,
  ) {
    const role = await this.prisma.role.findUnique({
      where: { id_companyId: { id: roleId, companyId } },
      include: { Actions: true },
    });
    const actionsToDisconnect = role.Actions.filter((action) => {
      return updatedRole.actionsIds.find((actionId) => action.id !== actionId);
    });
    const actions = updatedRole.actionsIds.map((actionId) => ({
      id: actionId,
      companyId,
    }));
    return this.prisma.role.update({
      where: { id_companyId: { id: roleId, companyId } },
      data: {
        ...updatedRole,
        Actions: {
          connect: actions,
          disconnect: actionsToDisconnect,
        },
      },
    });
  }
}
