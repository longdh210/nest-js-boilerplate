import {
	UserRole,
	UserRoleDocument,
} from '@modules/user-roles/entities/user-role.entity';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { UserRolesRepositoryInterface } from '@modules/user-roles/interfaces/user-roles.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRolesRepository
	extends BaseRepositoryAbstract<UserRoleDocument>
	implements UserRolesRepositoryInterface
{
	constructor(
		@InjectModel(UserRole.name)
		private readonly user_role_model: Model<UserRoleDocument>,
	) {
		super(user_role_model);
	}
}
