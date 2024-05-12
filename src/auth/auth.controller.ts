import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('signup')
  async signUp(
    @Body()
    authCredentialsDto: AuthCredentialsDto
  ) {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('signin')
  async signIn(
    @Body()
    authCredentialsDto: AuthCredentialsDto
  ) {

    const jwtAccessToken = await this.authService.signIn(authCredentialsDto);

    if (!jwtAccessToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return jwtAccessToken;
  }
}
