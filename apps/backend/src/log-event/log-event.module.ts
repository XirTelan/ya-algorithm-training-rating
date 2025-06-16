import { Module } from '@nestjs/common';
import { LogEventService } from './log-event.service';
import { LogEventController } from './log-event.controller';

@Module({
  controllers: [LogEventController],
  providers: [LogEventService],
})
export class LogEventModule {}
