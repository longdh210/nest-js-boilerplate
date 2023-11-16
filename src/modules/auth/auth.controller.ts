import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { RequestWithUser } from 'src/types/requests.type';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly auth_service: AuthService) {}

	@Post('sign-up')
	@ApiOperation({
		summary: 'User sign up to application',
		description: '### User sign up',
		servers: [
			{ url: 'http://localhost:3000', description: 'Current server' },
			{
				url: 'http://localhost:9000',
				description: 'Authentication service if exist',
			},
		],
	})
	@ApiBody({
		type: SignUpDto,
		examples: {
			user_1: {
				value: {
					first_name: 'Long',
					last_name: 'Duong',
					email: 'longdh@gmail.com',
					password: 'D123123@/',
				} as SignUpDto,
			},
			user_2: {
				value: {
					first_name: 'Leo',
					last_name: 'Meo',
					email: 'meo@gmail.com',
					password: 'A123123@/',
				} as SignUpDto,
			},
		},
	})
	async signUp(@Body() sign_up_dto: SignUpDto) {
		return await this.auth_service.signUp(sign_up_dto);
	}

	@UseGuards(LocalAuthGuard)
	@Post('sign-in')
	async signIn(@Req() request: RequestWithUser) {
		const { user } = request;
		return await this.auth_service.signIn(user._id.toString());
	}

	@UseGuards(JwtRefreshTokenGuard)
	@Post('refresh')
	async refreshAccessToken(@Req() request: RequestWithUser) {
		const { user } = request;
		const access_token = this.auth_service.generateAccessToken({
			user_id: user._id.toString(),
		});
		return {
			access_token,
		};
	}
}
