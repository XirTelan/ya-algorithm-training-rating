import { Injectable } from '@nestjs/common';
import { CreateLogEventDto } from './dto/create-log-event.dto';
import { UpdateLogEventDto } from './dto/update-log-event.dto';

@Injectable()
export class LogEventService {
  create(createLogEventDto: CreateLogEventDto) {
    return 'This action adds a new logEvent';
  }

  findAll() {
    return `This action returns all logEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logEvent`;
  }

  update(id: number, updateLogEventDto: UpdateLogEventDto) {
    return `This action updates a #${id} logEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} logEvent`;
  }
}
