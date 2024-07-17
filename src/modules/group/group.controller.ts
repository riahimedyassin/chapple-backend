import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  ForbiddenException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtGuard } from '@core/auth/guards/JwtGuard.guard';
import { User } from '@common/decorators/user/user.decorator';
import { RequestUserInterface } from '@interfaces/RequestUser.interface';
import { HttpResponse } from '@common/models';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(
    @Body() createGroupDto: CreateGroupDto,
    @User() user: RequestUserInterface,
  ) {
    const result = await this.groupService.create(createGroupDto, user.email);
    return new HttpResponse(result, 'Group created successfully', 201);
  }

  @Get()
  @UseGuards(JwtGuard)
  async findAll(@User() user: RequestUserInterface) {
    const result = await this.groupService.findAll(user.email);
    return new HttpResponse(result, 'Group chat retrieved successfully');
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @User() user: RequestUserInterface,
  ) {
    const result = await this.groupService.findOne(id, user.email);
    if (!result) throw new NotFoundException('Group not found');
    return result;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
