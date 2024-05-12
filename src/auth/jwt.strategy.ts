import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "./interface/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: (req) => {
        return ExtractJwt.fromAuthHeaderAsBearerToken()(req)
        // || ExtractJwt.fromExtractors();
      }
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findOne({
      where: { username: payload.username }
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}