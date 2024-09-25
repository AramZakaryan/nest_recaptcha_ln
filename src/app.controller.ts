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
  async passwordRecovery(@Body() body: { email: string; recaptchaToken: string }) {
    if (await recaptchaAdapter.isValid(body.recaptchaToken)) {
      return `you are human`
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
        secret: '6LfF304qAAAAAK1UT-DV1yXpLEMT1RPZSDZK16nf',
        response: value,
      }),
    }).then((res) => res.json())

    console.log(result)

    return result.success
  },
}
