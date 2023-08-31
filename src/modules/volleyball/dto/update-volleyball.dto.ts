import { PartialType } from '@nestjs/swagger';
import { CreateVolleyballDto } from './create-volleyball.dto';

export class UpdateVolleyballDto extends PartialType(CreateVolleyballDto) {}
