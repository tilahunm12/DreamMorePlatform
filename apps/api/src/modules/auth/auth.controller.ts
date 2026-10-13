import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

/**
 * AuthController - የተጠቃሚዎች ምዝገባ እና መግቢያ API Endpoints መቆጣጠሪያ
 * 
 * Endpoints:
 * - POST /api/auth/register : አዲስ ተጠቃሚ መመዝገብ
 * - POST /api/auth/login    : ወደ ሲስተሙ መግባት
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * አዲስ ተጠቃሚ መመዝገቢያ Endpoint
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /**
   * ተጠቃሚ መግቢያ Endpoint
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /**
   * በ Google መመዝገቢያ ወይም መግቢያ Endpoint
   */
  @Post('google')
  @HttpCode(HttpStatus.OK)
  async googleAuth(@Body() body: { email: string; name: string; avatarUrl?: string; role?: any }) {
    return this.authService.googleAuth(body);
  }
}
