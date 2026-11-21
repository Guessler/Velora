import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCategoryInput } from './create-category.dto.js';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {}