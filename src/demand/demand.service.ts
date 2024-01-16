import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Demand } from './entities/demand.entity';
import { Repository } from 'typeorm';
import { PageOptionsDto } from 'src/dto/page-options.dto';
import { PageMetaDto } from 'src/dto/page-meta.dto';
import { PageDto } from 'src/dto/page.dto';

@Injectable()
export class DemandService {
  constructor(@InjectRepository(Demand) private repo: Repository<Demand>) {}

  create(createDemandDto: CreateDemandDto) {
    const demand = this.repo.create({
      ...createDemandDto,
      status: 'planning',
    });

    return this.repo.save(demand);
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const [demands, count] = await this.repo.findAndCount({
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      order: {
        created_at: pageOptionsDto?.order,
      },
    });

    const pageMetaDto = new PageMetaDto({ itemCount: count, pageOptionsDto });

    return new PageDto(demands, pageMetaDto);
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateDemandDto: UpdateDemandDto) {
    const demand = await this.findOne(id);

    if (!demand) throw new NotFoundException();

    Object.assign(demand, {
      ...updateDemandDto,
    });

    return this.repo.save(demand);
  }

  async remove(id: number) {
    const demand = await this.findOne(id);

    if (!demand) throw new NotFoundException();

    return this.repo.remove(demand);
  }
}
