import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async validateUser(id: number) {
    const pattern = { cmd: 'get_user' };
    const payload = { id };
    return await lastValueFrom(this.client.send(pattern, payload));
  }
}
