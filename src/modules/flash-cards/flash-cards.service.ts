import { Inject, Injectable } from '@nestjs/common';
import { CreateFlashCardDto } from './dto/create-flash-card.dto';
import { UpdateFlashCardDto } from './dto/update-flash-card.dto';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { FlashCard } from './entities/flash-card.entity';
import { FlashCardsRepositoryInterface } from './interfaces/flash-card.interface';

@Injectable()
export class FlashCardsService extends BaseServiceAbstract<FlashCard> {
	constructor(
		@Inject('FlashCardsRepositoryInterface')
		private readonly flash_card_repository: FlashCardsRepositoryInterface,
	) {
		super(flash_card_repository);
	}
}
