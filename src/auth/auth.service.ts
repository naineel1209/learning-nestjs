import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository, // this will be injected by Nest when AuthService is created by Nest (dependency injection)
    private readonly jwtService: JwtService // this will be injected by Nest when AuthService is created by Nest (dependency injection)
  ) { }

  async signUp(authCrendentialsDto: AuthCredentialsDto) {
    return await this.userRepository.createUser(authCrendentialsDto);
  }

  async signIn(authCrendentialsDto: AuthCredentialsDto) {

    const validatedUser = await this.userRepository.validateUserPassword(authCrendentialsDto);

    if (!validatedUser) {
      return null;
    }

    const payload: JwtPayload = { username: validatedUser.username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
