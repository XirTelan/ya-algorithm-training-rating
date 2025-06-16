import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LogEventService } from './log-event.service';
import { CreateLogEventDto } from './dto/create-log-event.dto';
import { UpdateLogEventDto } from './dto/update-log-event.dto';

@Controller('log-event')
export class LogEventController {
  constructor(private readonly logEventService: LogEventService) {}

  @Post()
  create(@Body() createLogEventDto: CreateLogEventDto) {
    return this.logEventService.create(createLogEventDto);
  }

  @Get()
  findAll() {
    return this.logEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logEventService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLogEventDto: UpdateLogEventDto,
  ) {
    return this.logEventService.update(+id, updateLogEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logEventService.remove(+id);
  }
}
