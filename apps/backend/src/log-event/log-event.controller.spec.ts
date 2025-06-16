import { Test, TestingModule } from '@nestjs/testing';
import { LogEventController } from './log-event.controller';
import { LogEventService } from './log-event.service';

describe('LogEventController', () => {
  let controller: LogEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogEventController],
      providers: [LogEventService],
    }).compile();

    controller = module.get<LogEventController>(LogEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
