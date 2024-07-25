import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { createMessageDto } from './dto';
import { SerializeBigintInterceptor } from '@common/interceptors/serialize-bigint/serialize-bigint.interceptor';
import { JwtGuard } from '@core/auth/guards/JwtGuard.guard';
import { User } from '@common/decorators/user/user.decorator';
import { RequestUserInterface } from '@interfaces/RequestUser.interface';
import { HttpResponse } from '@common/models';

@Controller('messages')
@UseInterceptors(SerializeBigintInterceptor)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':username/:page')
  @UseGuards(JwtGuard)
  async findAll(
    @User() user: RequestUserInterface,
    @Param('username') username: string,
    @Param('page', ParseIntPipe) page: number = 1,
  ) {
    const result = await this.messageService.findAll(
      user.email,
      page,
      username,
    );
    return new HttpResponse(result);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.remove(id);
  }
}
