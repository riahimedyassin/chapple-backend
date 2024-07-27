import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { JwtGuard } from '@core/auth/guards/JwtGuard.guard';
import { User } from '@common/decorators/user/user.decorator';
import { RequestUserInterface } from '@interfaces/RequestUser.interface';
import { HttpResponse } from '@common/models';

@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(
    @Body() createFriendDto: CreateFriendDto,
    @User() user: RequestUserInterface,
  ) {
    const response = await this.friendService.create(
      createFriendDto,
      user.email,
    );
    return new HttpResponse(response, 'Friend request sent', 201);
  }
  @Get('')
  @UseGuards(JwtGuard)
  async findAll(@User() user: RequestUserInterface) {
    const result = await this.friendService.findAll(user.email);
    return new HttpResponse(result, 'Friend list retrieved sucessfully');
  }

  @Get('requests')
  @UseGuards(JwtGuard)
  async findAllRequests(@User() user: RequestUserInterface) {
    const result = await this.friendService.findAllRequests(user.email);
    return new HttpResponse(result, 'Friend list retrieved sucessfully');
  }
  @Get('requests/count')
  @UseGuards(JwtGuard)
  async findAllRequestNumber(@User() user: RequestUserInterface) {
    const result = await this.friendService.findAllRequestsNumber(user.email);
    return new HttpResponse(result, 'Friend list retrieved sucessfully');
  }
  @Get('invitations')
  @UseGuards(JwtGuard)
  async findAllInvitations(@User() user: RequestUserInterface) {
    const result = await this.friendService.findAllInvitations(user.email);
    return new HttpResponse(result, 'Friend list retrieved sucessfully');
  }

  @Patch('respond/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async aceeptFriendRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { accepted: boolean },
  ) {
    return this.friendService.update(id, { accepted: body.accepted });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.friendService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
  //   return this.friendService.update(+id, updateFriendDto);
  // }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.friendService.remove(id);
  }
}
