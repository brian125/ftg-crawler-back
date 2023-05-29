import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HostController } from './host.controller';
import { Host, HostSchema } from './entities/host.entity';
import { HostService } from './host.service';

@Module({
  controllers: [HostController],
  providers: [HostService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Host.name,
        schema: HostSchema,
      },
    ])
  ],
  exports: [
    MongooseModule,
    HostService
  ]
})
export class HostModule {}