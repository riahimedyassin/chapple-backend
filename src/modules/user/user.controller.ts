import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UseGuards,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { SerializeBigintInterceptor } from '@common/interceptors/serialize-bigint/serialize-bigint.interceptor';
import { UserAuthGuard } from '@core/auth/guards/UserAuthGuard.guard';
import { User } from '@common/decorators/user/user.decorator';
import { RequestUserInterface } from '@interfaces/RequestUser.interface';
import { HttpResponse } from '@common/models/HttpResponse';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from '@core/auth/guards/JwtGuard.guard';

@Controller('users')
@UseInterceptors(SerializeBigintInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserAuthGuard)
  async login(@User() user: RequestUserInterface) {
    return new HttpResponse(user, 'Logged Successfully');
  }

  @Post('register')
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll() {
    return this.userService.findAll();
  }
  @Get('me')
  @UseGuards(JwtGuard)
  async getCurrentConnected(@User() user: RequestUserInterface) {
    const connected = await this.userService.findOne(user.email);
    return new HttpResponse(connected);
  }
  @Get('email/:username')
  async getEmail(@Param('username') username: string) {
    const result = await this.userService.getEmail(username);
    return new HttpResponse(result);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
