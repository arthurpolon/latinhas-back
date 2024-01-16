import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { DemandService } from './demand.service';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { PageOptionsDto } from 'src/dto/page-options.dto';

@Controller('demand')
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @Post()
  create(@Body() createDemandDto: CreateDemandDto) {
    return this.demandService.create(createDemandDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.demandService.findAll(pageOptionsDto);
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
