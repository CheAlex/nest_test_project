import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from '@/identity/application/service/user.service';
import { CreateUserRequest } from '@/identity/application/service/user/create-user-request';
import { Public } from '@/common-module/decorators/controller/public.decorator';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { UpdateUserRequest } from '@/identity/application/service/user/update-user-request';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @ApiBasicAuth()
  @ApiOperation({
    description: 'Эндпоинт используется для получения всех пользователей'
  })
  @ApiOkResponse({
    description: 'Получены все пользователи',
    content: {
      'application/json': {
        schema: {
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Не верный пейлоад',
    content: {
      'application/json': {
        schema: {
          properties: {
            error: {
              type: 'string',
              example: 'Bad Request',
            },
            message: {
              type: 'array',
              items: {
                type: 'string',
                example: [
                  'sex must be a valid enum value',
                  'role must be a valid enum value'
                ],
              }
            },
          }
        }
      }
    }
  })
  @ApiInternalServerErrorResponse({
    description: 'Серверная ошибка',
    content: {
      'application/json': {
        schema: {
          properties: {
            message: {
              type: 'string',
              example: 'some server error',
            }
          }
        }
      }
    }
  })
  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return await this.userService.findAll(paginationQueryDto);
  }

  @ApiBasicAuth()
  @Get(':userHash')
  getOne(@Param('userHash') userHash: string) {
    return this.userService.getOne(userHash);
  }

  @Public()
  @Post()
  create(@Body() createUserRequest: CreateUserRequest) {
    return this.userService.create(createUserRequest);
  }

  @ApiBasicAuth()
  @Put(':userHash')
  update(
    @Param('userHash') userHash,
    @Body() updateUserRequest: UpdateUserRequest
  ) {
    return this.userService.update(userHash, updateUserRequest);
  }

  @ApiBasicAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userHash')
  remove(@Param('userHash') userHash: string) {
    return this.userService.remove(userHash);
  }
}
