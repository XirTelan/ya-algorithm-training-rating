import { PartialType } from '@nestjs/mapped-types';
import { CreateLogEventDto } from './create-log-event.dto';

export class UpdateLogEventDto extends PartialType(CreateLogEventDto) {}
