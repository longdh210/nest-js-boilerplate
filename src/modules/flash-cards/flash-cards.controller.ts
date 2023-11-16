import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UseGuards,
	Req,
	UploadedFile,
} from '@nestjs/common';
import { FlashCardsService } from './flash-cards.service';
import { CreateFlashCardDto } from './dto/create-flash-card.dto';
import { UpdateFlashCardDto } from './dto/update-flash-card.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAccessTokenGuard } from '@modules/auth/guards/jwt-access-token.guard';
import { RequestWithUser } from 'src/types/requests.type';
import { Public } from 'src/decorators/auth.decorators';

@Controller('flash-cards')
export class FlashCardsController {
	constructor(private readonly flashCardsService: FlashCardsService) {}

	@Public()
	@Post()
	@ApiOperation({
		summary: 'User create their new flash card',
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				vocabulary: {
					type: 'string',
					default: 'provision',
				},
				definition: {
					type: 'string',
					default: 'the action of providing or supplying something for use',
				},
				meaning: {
					type: 'string',
					default: 'sự cung cấp',
				},
				examples: {
					type: 'array',
					items: {
						type: 'string',
						default: '',
					},
					default: [
						'new contracts for the provision of services',
						'low levels of social provision',
						'civilian contractors were responsible for provisioning these armies',
					],
				},
				image: {
					type: 'string',
					format: 'binary',
				},
			},
			required: ['vocabulary', 'definition', 'meaning', 'image'],
		},
	})
	@UseInterceptors(FileInterceptor('image'))
	@UseGuards(JwtAccessTokenGuard)
	create(
		@Req() request: RequestWithUser,
		@UploadedFile() image: Express.Multer.File,
		@Body() createFlashCardDto: CreateFlashCardDto,
	) {
		console.log(createFlashCardDto.examples);
		return this.flashCardsService.create({
			...createFlashCardDto,
			user: request.user,
			image: image.originalname,
		});
	}

	@Get()
	findAll() {
		return this.flashCardsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.flashCardsService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateFlashCardDto: UpdateFlashCardDto,
	) {
		return this.flashCardsService.update(id, updateFlashCardDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.flashCardsService.remove(id);
	}
}
