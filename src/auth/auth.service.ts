import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) { }

  async signUp(authCrendentialsDto: AuthCredentialsDto) {
    return await this.userRepository.createUser(authCrendentialsDto);
  }

  async signIn(authCrendentialsDto: AuthCredentialsDto) {

    const validatedUser = await this.userRepository.validateUserPassword(authCrendentialsDto);

    if (!validatedUser) {
      return null;
    }

    const payload = { username: validatedUser.username };
    const accessToken = this.jwtService.sign(payload);


  }
}
