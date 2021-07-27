import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateCompanyUserDTO } from '../dto/create-company-user.dto';
import { UpdateCompanyUserDTO } from '../dto/update-company-user.dto copy';
import { PrismaService } from '../../PrismaModule/service/prisma.service';

@Injectable()
export class CompanyUserService {
  constructor(private readonly prisma: PrismaService) {}

  public findById(companyUserId: string, companyId: string) {
    return this.prisma.companyUser.findUnique({
      where: { id_companyId: { id: companyUserId, companyId } },
    });
  }

  public create(companyId: string, companyUser: CreateCompanyUserDTO) {
    const roles = companyUser.roles.map((role) => ({ id: role }));
    const actions = companyUser.actions.map((action) => ({ id: action }));
    return this.prisma.companyUser.create({
      data: {
        id: companyUser.id ?? (uuidv4() as string),
        Roles: {
          connect: roles,
        },
        Actions: {
          connect: actions,
        },
      },
    });
  }

  public async update(
    companyUserId: string,
    companyId: string,
    updatedCompanyUser: UpdateCompanyUserDTO,
  ) {
    const companyUser = await this.prisma.companyUser.findFirst({
      where: { id: companyUserId, companyId },
      include: { Actions: true, Roles: true },
    });
    const roles = updatedCompanyUser.roles.map((role) => ({ id: role }));
    const rolesToDisconnect = companyUser.Roles.filter(
      (role) =>
        !updatedCompanyUser.roles.find(
          (updatedUserRole) => updatedUserRole !== role.id,
        ),
    ).map(({ id }) => ({ id }));
    const actions = updatedCompanyUser.roles.map((role) => ({ id: role }));
    const actionsToDisconnect = companyUser.Actions.filter(
      (action) =>
        !updatedCompanyUser.actions.find(
          (updatedUserAction) => updatedUserAction !== action.id,
        ),
    ).map(({ id }) => ({ id }));
    return this.prisma.companyUser.update({
      where: {
        id: companyUserId,
      },
      data: {
        id: companyUser.id ?? (uuidv4() as string),
        Roles: {
          disconnect: rolesToDisconnect,
          connect: roles,
        },
        Actions: {
          disconnect: actionsToDisconnect,
          connect: actions,
        },
      },
    });
  }

  public delete(companyUserId: string, companyId: string) {
    return this.prisma.companyUser.delete({
      where: { id_companyId: { id: companyUserId, companyId } },
    });
  }
}
