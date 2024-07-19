import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupMessageService } from './group-message.service';
import { CreateGroupMessageDto } from './dto/create-group-message.dto';
import { UpdateGroupMessageDto } from './dto/update-group-message.dto';
import { HttpResponse } from '@common/models';

@Controller('groups/message')
export class GroupMessageController {
  constructor(private readonly groupMessageService: GroupMessageService) {}

  @Post()
  create(@Body() createGroupMessageDto: CreateGroupMessageDto) {
    return this.groupMessageService.create(createGroupMessageDto);
  }

  @Get(':groupID')
  async findAll(@Param('groupID') groupID: number) {
    const result = await this.groupMessageService.findAll(groupID);
    return new HttpResponse(result, 'Group messages retrieved successfully');
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.groupMessageService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateGroupMessageDto: UpdateGroupMessageDto,
  // ) {
  //   return this.groupMessageService.update(+id, updateGroupMessageDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupMessageService.remove(+id);
  }
}
