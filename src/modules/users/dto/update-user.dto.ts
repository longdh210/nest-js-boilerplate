import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
	IsDateString,
	IsEnum,
	IsOptional,
	IsPhoneNumber,
	MaxLength,
} from 'class-validator';
import { GENDER } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(
	OmitType(CreateUserDto, ['email', 'password', 'username'] as const),
) {
	@IsOptional()
	@IsPhoneNumber()
	phone_number?: string;

	@IsOptional()
	@IsDateString()
	date_of_birth?: Date;

	@IsOptional()
	@IsEnum(GENDER)
	gender?: string;

	@IsOptional()
	@MaxLength(200)
	headline?: string;
}
