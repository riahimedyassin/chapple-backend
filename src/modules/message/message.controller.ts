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

  @Get(':page')
  @UseGuards(JwtGuard)
  async findAll(
    @User() user: RequestUserInterface,
    @Param(ParseIntPipe) page: number = 1,
  ) {
    const result = await this.messageService.findAll(user.email, page);
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
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
