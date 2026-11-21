import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBrandInput } from './create-brand.dto.js';

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) {}