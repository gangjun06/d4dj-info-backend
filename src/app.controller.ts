import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get('')
  index() {
    return `
    this website is d4dj.info's api server.
    `;
  }
}
