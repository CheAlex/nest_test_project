import { Controller, HttpCode, HttpStatus, Post, Request, Response, UseGuards } from '@nestjs/common';
import { LoginGuard } from '@/common-module/guards/login.guard';
import { Public } from '@/common-module/decorators/controller/public.decorator';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('')
export class AuthenticationController {
  @ApiOperation({
    description: 'Эндпоинт используется для логина пользователя. После успешного' +
      ' логина необходимо в куки клиента записать идентификатор токена, который ' +
      'будет автоматически подкладываться во все последующие запросы.'
  })
  @ApiHeader({
    name: 'auth',
    description: 'base64 string concatenated email + : + password',
    schema: {
      type: 'string',
      example: 'Base amRvZUBlbWFpbC5jb206MTIzNDU2',
    }
  })
  @ApiNoContentResponse({
    description: 'Успешно установлена куки которая ответчает за авторизацию пользователя',
    headers: {
      'Set-Cookie': {
        schema: {
          type: 'string',
          example: 'Example: USERSESSIONID=abcde12345; Path=/;',
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
  @ApiUnauthorizedResponse({
    description: 'Требуется логин',
    content: {
      'application/json': {
        schema: {
          properties: {
            message: {
              type: 'string',
              example: 'not authenticated',
            }
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
  @UseGuards(LoginGuard)
  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('login')
  async login() {}

  @ApiOperation({
    description: 'Эндпоинт используется для разлогина пользователя. В случае ' +
      'успешной операции необходимо удалить идентификатор токена из кук клиента, ' +
      'а также очистить токен из хранилища.'
  })
  @ApiBasicAuth()
  @ApiNoContentResponse({
    description: 'Успех: Отсутствует тело ответа',
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
  @ApiUnauthorizedResponse({
    description: 'Требуется логин',
    content: {
      'application/json': {
        schema: {
          properties: {
            message: {
              type: 'string',
              example: 'not authenticated',
            }
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@Request() request, @Response() response) {
    request.session.destroy();
    response.clearCookie(process.env.APP_SESSION_COOKIE_NAME);
    response.send('');
  }
}
