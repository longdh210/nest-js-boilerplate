import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@modules/users/users.service';
import { UsersRepository } from '@repositories/users.repository';
import { User } from '@modules/users/entities/user.entity';
import { UserRolesService } from '@modules/user-roles/user-roles.service';
import { UserRolesRepository } from '@repositories/user-roles.repository';
import { UserRole } from '@modules/user-roles/entities/user-role.entity';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';

describe('AuthService', () => {
	let auth_service: AuthService;
	beforeEach(async () => {
		const module_ref = await Test.createTestingModule({
			providers: [
				AuthService,
				ConfigService,
				JwtService,
				UsersService,
				{
					provide: 'UsersRepositoryInterface',
					useClass: UsersRepository,
				},
				{
					provide: 'UsersRolesRepositoryInterface',
					useClass: UserRolesRepository,
				},
				{
					provide: getModelToken(User.name),
					useValue: {},
				},
				{
					provide: getModelToken(UserRole.name),
					useValue: {},
				},
			],
		}).compile();
		auth_service = module_ref.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(auth_service).toBeDefined();
	});
});
