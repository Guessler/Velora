import { Controller, Get } from '@nestjs/common';
import { Public } from '@nestjs/authentication';
import { SkipThrottle } from '@nestjs/throttler';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SkipThrottle()
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
