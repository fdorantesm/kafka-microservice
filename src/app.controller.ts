import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA')
    private readonly kafka: ClientProxy,
  ) {}

  @MessagePattern('message.created')
  public messageCreate(@Payload() payload: any) {
    Logger.log(payload.value, AppController.name);
  }

  @Post('/send')
  public sendMessage(
    @Body('message') message: string,
    @Body('user') user: string,
  ) {
    return firstValueFrom(
      this.kafka.emit('message.created', {
        message,
        user,
      }),
    );
  }
}
