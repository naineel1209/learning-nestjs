import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { DUPLICATE_USERNAME_ERROR } from "./auth.constants";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@Injectable()
export class UserRepository extends Repository<User>{

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner)
  }

  async createUser(authCrendentialsDto: AuthCredentialsDto) {
    const { username, password } = authCrendentialsDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      password: hashedPassword
    });

    try {
      await this.userRepository.save(user);
    } catch (err) {
      if (err.code === DUPLICATE_USERNAME_ERROR.code) {
        throw new ConflictException(DUPLICATE_USERNAME_ERROR.message);
      } else {
        throw new InternalServerErrorException("Something went wrong")
      }
    }
    return user;
  }

  async validateUserPassword(authCrendentialsDto: AuthCredentialsDto) {
    const { username, password } = authCrendentialsDto;

    const user = await this.userRepository.findOne({
      where: { username }
    });


    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      return null;
    }
  }
}