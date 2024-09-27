import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import * as process from 'node:process'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  // v3
  @Post('password_recovery')
  async passwordRecovery(@Body() body: { email: string; recaptchaToken: string }) {
    if (await recaptchaAdapter.isValid(body.recaptchaToken)) {
      return JSON.stringify(`you are human!!!`)
    } else {
      throw new BadRequestException('recaptcha error')
    }
  }

  // v2
  @Post('password_recovery_v2')
  async passwordRecoveryV2(@Body() body: { email: string; recaptchaToken: string }) {
    if (await recaptchaAdapter.isValidV2(body.recaptchaToken)) {
      return JSON.stringify(`you are human!!!`)
    } else {
      throw new BadRequestException('recaptcha error')
    }
  }
}

const recaptchaAdapter = {
  async isValid(value: string): Promise<boolean> {
    const result = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_V3,
        response: value,
      }),
    }).then((res) => res.json())

    console.log(result)

    return result.success
  },
  async isValidV2(value: string): Promise<boolean> {
    const result = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_V2,
        response: value,
      }),
    }).then((res) => res.json())

    console.log(result, value)

    return result.success
  },
}
