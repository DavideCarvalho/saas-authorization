import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../PrismaModule/service/prisma.service';
import { RequestWithCompanyId } from '../types/request-with.id.type';

@Injectable()
export class CompanyClientCredentialsGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.header('authorization');
    const [, base64Authorization] = authorization.split(' ');
    const decodedAuthorization = Buffer.from(
      base64Authorization,
      'base64',
    ).toString('utf-8');
    const [name, secret] = decodedAuthorization.split(':');
    const companyClientCredentials =
      await this.prisma.companyClientCredentials.findFirst({
        where: { name, secret },
      });
    if (!companyClientCredentials) return false;
    (request as RequestWithCompanyId).companyId =
      companyClientCredentials.companyId;
    return true;
  }
}
