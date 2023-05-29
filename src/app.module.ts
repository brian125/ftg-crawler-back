import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { LibraryModule } from './library/library.module';
import { HostModule } from './host/host.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://brayansilva82151:opTg1lUyENq1HjPI@librarycatalogcluster.mrlesrh.mongodb.net/libraryCatalog',
    ),
    UserModule,
    LibraryModule,
    HostModule,
    CommonModule,
  ],
})

export class AppModule {}
