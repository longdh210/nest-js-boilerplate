import {
	ArrayMinSize,
	IsArray,
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsStrongPassword,
	MaxLength,
	ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './create-address.dto';
import { Type } from 'class-transformer';
import { LANGUAGES } from '../entities/user.entity';

export class CreateUserDto {
	@IsNotEmpty()
	@MaxLength(50)
	first_name: string;

	@IsNotEmpty()
	@MaxLength(50)
	last_name: string;

	@IsNotEmpty()
	@MaxLength(50)
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@MaxLength(50)
	username: string;

	@IsNotEmpty()
	@IsStrongPassword()
	password: string;

	@IsOptional()
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => CreateAddressDto)
	address?: CreateAddressDto[];

	@IsOptional()
	@IsArray()
	@ArrayMinSize(1)
	@IsEnum(LANGUAGES, { each: true })
	interested_languages?: LANGUAGES[];
}
