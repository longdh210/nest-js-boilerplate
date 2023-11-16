import { Injectable } from '@nestjs/common';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import {
	FlashCard,
	FlashCardDocument,
} from '@modules/flash-cards/entities/flash-card.entity';
import { FlashCardsRepositoryInterface } from '@modules/flash-cards/interfaces/flash-card.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FlashCardsRepository
	extends BaseRepositoryAbstract<FlashCardDocument>
	implements FlashCardsRepositoryInterface
{
	constructor(
		@InjectModel(FlashCard.name)
		private readonly flash_card_model: Model<FlashCardDocument>,
	) {
		super(flash_card_model);
	}
}
