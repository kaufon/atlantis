import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { PrismaService } from './database/prisma.service';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [PrismaService,CustomerService],
})
export class AppModule {}
