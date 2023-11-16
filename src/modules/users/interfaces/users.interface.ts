import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { User } from '../entities/user.entity';
import { FindAllResponse } from 'src/types/common.type';

export interface UsersRepositoryInterface
	extends BaseRepositoryInterface<User> {
	findAllWithSubFields(
		condition: object,
		options: {
			projection?: string;
			populate?: string[] | any;
			offset?: number;
			limit?: number;
		},
	): Promise<FindAllResponse<User>>;
	getUserWithRole(user_id: string): Promise<User>;
}
