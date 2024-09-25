import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('password_recovery')
  passwordRecovery(@Body() body: { email: string; recaptchaToken: string }): string {
    if (recaptchaAdapter.isValid(body.recaptchaToken)) {
      return `email was sent   ${JSON.stringify(body)}`
    } else {
      throw new BadRequestException('recaptcha error')
    }
  }
}

const recaptchaAdapter = {
  isValid(value) {
    return true
  },
}
