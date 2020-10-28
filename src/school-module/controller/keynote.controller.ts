import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { KeynoteService } from '@/school/application/service/keynote.service';
import { CreateKeynoteRequest } from '@/school/application/service/keynote/create-video-request';
import { UpdateKeynoteRequest } from '@/school/application/service/keynote/update-video-request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Keynotes')
@Controller('keynotes')
export class KeynoteController {
  constructor(
    private readonly keynoteService: KeynoteService,
  ) {
  }

  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return await this.keynoteService.findAll(paginationQueryDto);
  }

  @Get(':keynoteHash')
  getOne(@Param('keynoteHash') keynoteHash: string) {
    return this.keynoteService.getOne(keynoteHash);
  }

  @Post()
  create(@Body() createKeynoteRequest: CreateKeynoteRequest) {
    return this.keynoteService.create(createKeynoteRequest);
  }

  @Put(':keynoteHash')
  update(
    @Param('keynoteHash') keynoteHash: string,
    @Body() updateKeynoteRequest: UpdateKeynoteRequest
  ) {
    return this.keynoteService.update(keynoteHash, updateKeynoteRequest);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':keynoteHash')
  remove(@Param('keynoteHash') keynoteHash: string) {
    return this.keynoteService.remove(keynoteHash);
  }
}
