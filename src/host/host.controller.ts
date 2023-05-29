import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostDto } from './dto/update-host.dto';
import { HostService } from './host.service';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post()
  create(@Body() createHostDto: CreateHostDto) {
    return this.hostService.create(createHostDto);
  }

  @Get()
  findAll() {
    return this.hostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHostDto: UpdateHostDto) {
    return this.hostService.update( id, updateHostDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.hostService.remove( id );
  }
}