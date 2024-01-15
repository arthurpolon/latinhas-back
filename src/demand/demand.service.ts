import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Demand } from './entities/demand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DemandService {
  constructor(@InjectRepository(Demand) private repo: Repository<Demand>) {}

  create(createDemandDto: CreateDemandDto) {
    const demand = this.repo.create({
      description: createDemandDto.description,
      periodEnd: createDemandDto.periodEnd,
      periodStart: createDemandDto.periodStart,
      totalPlan: Number(createDemandDto.totalPlan),
      status: 'planning',
    });

    return this.repo.save(demand);
  }

  findAll() {
    return this.repo.find();
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
