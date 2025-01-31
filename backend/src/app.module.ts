import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AdsModule } from './ads/ads.module';
// import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://mongodb:27017/job-student-sandbox'), // Remplace avec ton URI
    MongooseModule.forRoot('mongodb://localhost:27017/job-student-sandbox'), // Remplace avec ton URI
    UserModule, AdsModule, AuthModule, 
  ],
})
export class AppModule {}
