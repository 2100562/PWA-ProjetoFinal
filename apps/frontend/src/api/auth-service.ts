export class AuthService {
  async login(username: string, password: string): Promise<string> {
    return Promise.resolve('token');
  }
}
