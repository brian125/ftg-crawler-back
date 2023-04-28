import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './entities/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ])
  ],
  exports: [
    MongooseModule
  ]
})
export class UserModule {}