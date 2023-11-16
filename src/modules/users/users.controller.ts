import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	ClassSerializerInterceptor,
	SerializeOptions,
	UseGuards,
	UploadedFiles,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import MongooseClassSerializerInterceptor from 'src/interceptors/mongoose-class-serializer.interceptor';
import { User } from './entities/user.entity';
import { JwtAccessTokenGuard } from '@modules/auth/guards/jwt-access-token.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { USER_ROLE } from '@modules/user-roles/entities/user-role.entity';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('users')
@ApiTags('users')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({
		summary: 'Admin create new user',
		description: `
* Only admin can use this API

* Admin create user and give some specific information`,
	})
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@SerializeOptions({ excludePrefixes: ['first', 'last'] })
	@Get()
	@UseGuards(JwtAccessTokenGuard)
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
	//   return this.usersService.update(id, updateUserDto);
	// }

	@Delete(':id')
	@Roles(USER_ROLE.ADMIN)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAccessTokenGuard)
	remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}

	@Post('student-cards')
	@ApiOperation({
		summary: 'Student update their student card',
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				student_card_front: {
					type: 'string',
					format: 'binary',
				},
				student_card_back: {
					type: 'string',
					format: 'binary',
				},
				live_photos: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary',
					},
				},
			},
			required: ['student_card_front', 'student_card_back', 'live_photos'],
		},
	})
	@UseInterceptors(AnyFilesInterceptor())
	updateStudentCard(@UploadedFiles() files: Array<Express.Multer.File>) {
		console.log(files);
		return files.map((file) => file.originalname);
	}
}
