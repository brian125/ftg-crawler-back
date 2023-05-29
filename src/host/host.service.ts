import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { isValidObjectId, Model } from 'mongoose';
import { Host } from './entities/host.entity';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostDto } from './dto/update-host.dto';

@Injectable()
export class HostService {
  constructor(
    @InjectModel(Host.name)
    private readonly hostModel: Model<Host>,
  ) {}

  async create(createHostDto: CreateHostDto) {
    try {
      const host = await this.hostModel.create(createHostDto);
      return host;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return this.hostModel.find().select('-__v');
  }

  async findOne(id: string) {
    let host: Host;
    if (!host && isValidObjectId(id)) {
      host = await this.hostModel.findById(id);
    }
    if (!host) throw new NotFoundException(`Host with id, "${id}" not found`);
    return host;
  }

  async update(id: string, updateHostDto: UpdateHostDto) {
    try {
      const host = await this.hostModel.findByIdAndUpdate(id, updateHostDto);
      return host
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.hostModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Host with id "${id}" not found`);
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Host exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create Host - Check server logs`,
    );
  }
}
