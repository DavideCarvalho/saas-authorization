import { Module } from '@nestjs/common';
import { CompanyModule } from './CompanyModule/company.module';
import { PrismaModule } from './PrismaModule/prisma.module';

@Module({
  imports: [CompanyModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
