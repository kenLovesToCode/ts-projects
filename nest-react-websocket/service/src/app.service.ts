import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTodos() {
    return ['first', 'second', 'third'];
  }
}
