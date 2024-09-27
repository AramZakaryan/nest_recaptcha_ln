import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the module available globally without needing to import in other modules
      envFilePath: '.env', // Optional: specify the path to your .env file
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
