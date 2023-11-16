import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UploadedFile,
	Req,
	UploadedFiles,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { COLLECTION_LEVEL } from './entities/collection.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { RequestWithUser } from 'src/types/requests.type';

@Controller('collections')
@ApiTags('collections')
export class CollectionsController {
	constructor(private readonly collectionsService: CollectionsService) {}

	@Post()
	@ApiOperation({
		summary: 'User create their collection',
	})
	@ApiBearerAuth('token')
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				name: {
					type: 'string',
					default: 'Learn Kitchen Vocabulary',
				},
				description: {
					type: 'string',
					default: 'Some description',
				},
				images: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary',
					},
				},
			},
			required: ['name', 'images'],
		},
	})
	@UseInterceptors(FilesInterceptor('image'))
	create(
		@Body() createCollectionDto: CreateCollectionDto,
		@UploadedFiles() image: Express.Multer.File,
		@Req() request: RequestWithUser,
	) {
		console.log({
			...createCollectionDto,
			user: request.user,
			image: image.originalname,
		});
		return this.collectionsService.create({
			...createCollectionDto,
			user: request.user,
			image: image.originalname,
		});
	}

	@Get()
	findAll() {
		return this.collectionsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.collectionsService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateCollectionDto: UpdateCollectionDto,
	) {
		return this.collectionsService.update(id, updateCollectionDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.collectionsService.remove(id);
	}
}
