import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { isValidObjectId, Model } from 'mongoose';
import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return this.userModel.find().select('-__v');
  }

  async findOne(id: string) {
    let user: User;
    if (!user && isValidObjectId(id)) {
      user = await this.userModel.findById(id);
    }
    if (!user) throw new NotFoundException(`User with id, "${id}" not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (updateUserDto.name)
      updateUserDto.name = updateUserDto.name.toLowerCase();
    try {
      await this.userModel.updateOne(updateUserDto);
      return { ...user, ...updateUserDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.userModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`User with id "${id}" not found`);
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `User exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create User - Check server logs`,
    );
  }
}
