import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign.up.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadsStorage } from 'src/multer';
import { CurrentUser } from './decorators';
import { User } from '@prisma/client';
import { TokenPayload } from './types/token.payload';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @UseInterceptors(FileInterceptor('avatarFile', { storage: uploadsStorage }))
  async signUp(
    @Body() dto: SignUpDto,
    @UploadedFile(
      new ParseFilePipeBuilder().addFileTypeValidator({ fileType: 'jpeg' }).build({
        fileIsRequired: false,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return await this.authService.signUp(dto, file?.filename);
  }

  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@CurrentUser() user: User) {
    return await this.authService.signIn(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@CurrentUser() user: TokenPayload) {
    return user;
  }
}
