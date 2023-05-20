import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { LibraryModule } from './library/library.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo:iSjqV11Jvmw9pOlPoJMI@containers-us-west-192.railway.app:5660',
      {
        dbName: 'library-db',
      },
    ),
    UserModule,
    LibraryModule,
    CommonModule,
  ],
})
export class AppModule {}
