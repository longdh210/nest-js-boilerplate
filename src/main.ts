import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DatabaseConfig } from './configs/configuration.config';
import { configSwagger } from '@configs/api-docs.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	configSwagger(app);
	const config_service = app.get(ConfigService);
	const logger = new Logger(bootstrap.name);
	const database_env = config_service.get<DatabaseConfig>('database');
	logger.debug(database_env);
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(config_service.get('PORT'), () => {
		logger.log(`Application running on port ${config_service.get('PORT')}`);
	});
}
bootstrap();
