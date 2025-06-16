import { Test, TestingModule } from '@nestjs/testing';
import { LogEventService } from './log-event.service';

describe('LogEventService', () => {
  let service: LogEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogEventService],
    }).compile();

    service = module.get<LogEventService>(LogEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
