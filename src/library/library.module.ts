import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LibraryController } from './library.controller';
import { Library, LibrarySchema } from './entities/library.entity';
import { LibraryService } from './library.service';
import { CommonModule } from 'src/common/common.module';
import { HostService } from 'src/host/host.service';
import { HostModule } from 'src/host/host.module';

@Module({
  controllers: [LibraryController],
  providers: [LibraryService],
  imports: [
    ConfigModule,
    HostModule,
    MongooseModule.forFeature([
      {
        name: Library.name,
        schema: LibrarySchema,
      },
    ]),
    CommonModule
  ],
  exports: [
    MongooseModule
  ]
})
export class LibraryModule {}