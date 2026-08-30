import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

/**
 * AuthModule - የተጠቃሚዎች መለያ አያያዝ፣ የJWT ሚስጥር ቁልፍ እና አገልግሎቶች ውህደት
 */
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dream_more_jwt_secret_key_2026',
      signOptions: { expiresIn: '7d' }, // ለ 7 ቀናት የሚያገለግል Token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
