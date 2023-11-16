import { Inject, Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { Collection } from './entities/collection.entity';
import { CollectionRepositoryInterface } from './interfaces/collection.interface';

@Injectable()
export class CollectionsService extends BaseServiceAbstract<Collection> {
	constructor(
		@Inject('CollectionRepositoryInterface')
		private readonly collection_repository: CollectionRepositoryInterface,
	) {
		super(collection_repository);
	}
}
