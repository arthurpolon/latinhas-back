import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemandModule } from './demand/demand.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demand } from './demand/entities/demand.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db.sqlite',
      entities: [Demand],
      synchronize: true,
    }),
    DemandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
