import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database_config } from './configs/configuration.config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@modules/users/users.module';
import { UserRolesModule } from '@modules/user-roles/user-roles.module';
import { TopicsModule } from '@modules/topics/topics.module';
import { FlashCardsModule } from '@modules/flash-cards/flash-cards.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CollectionsModule } from '@modules/collections/collections.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				NODE_ENV: Joi.string()
					.valid('development', 'production', 'test', 'provision', 'staging')
					.default('development'),
				PORT: Joi.number().default(3000),
			}),
			validationOptions: {
				abortEarly: false,
			},
			isGlobal: true,
			envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
			load: [database_config],
			cache: true,
			expandVariables: true,
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('DATABASE_URI'),
				dbName: configService.get<string>('DATABASE_NAME'),
			}),
			inject: [ConfigService],
		}),
		UsersModule,
		UserRolesModule,
		AuthModule,
		TopicsModule,
		FlashCardsModule,
		CollectionsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
