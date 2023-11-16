import { Injectable } from '@nestjs/common';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import {
	Collection,
	CollectionDocument,
} from '@modules/collections/entities/collection.entity';
import { CollectionRepositoryInterface } from '@modules/collections/interfaces/collection.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CollectionRepository
	extends BaseRepositoryAbstract<CollectionDocument>
	implements CollectionRepositoryInterface
{
	constructor(
		@InjectModel(Collection.name)
		private readonly collection_model: Model<CollectionDocument>,
	) {
		super(collection_model);
	}
}
