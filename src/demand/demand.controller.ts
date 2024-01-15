import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { DemandService } from './demand.service';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';

@Controller('demand')
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @Post()
  create(@Body() createDemandDto: CreateDemandDto) {
    return this.demandService.create(createDemandDto);
  }

  @Get()
  findAll() {
    return this.demandService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const demand = await this.demandService.findOne(+id);

    if (!demand) throw new NotFoundException();

    return demand;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemandDto: UpdateDemandDto) {
    return this.demandService.update(+id, updateDemandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demandService.remove(+id);
  }
}
