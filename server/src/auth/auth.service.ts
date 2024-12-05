import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign.up.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto) {
    const existedUser = await this.usersService.getByUsername(data.username);

    if (existedUser) {
      throw new BadRequestException('User is already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const createdUser = await this.usersService.create({
      username: data.username,
      fullname: data.fullname,
      passwordHash,
    });

    return createdUser;
  }

  async signIn(data: any) {
    const { id } = data;
    const token = await this.generateToken(id);

    return { token };
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.getByUsername(username);

    if (!user) {
      return null;
    }

    const isValidPass = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPass) {
      return null;
    }

    const { passwordHash, ...res } = user;

    return res;
  }

  private async generateToken(userId: string) {
    const token = await this.jwtService.signAsync({ userId });

    return token;
  }
}
