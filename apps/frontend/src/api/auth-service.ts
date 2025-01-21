import { api_base_url } from '../../constants';

export class AuthService {
  async login(username: string, password: string): Promise<string> {
    return this.request(api_base_url + '/auth', username, password);
  }

  async register(username: string, password: string): Promise<string> {
    await this.request(api_base_url + '/auth/register', username, password);
    return this.request(api_base_url + '/auth', username, password);
  }

  async request(
    url: string,
    username: string,
    password: string,
  ): Promise<string> {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      if (res.ok) {
        return res.text();
      } else {
        throw new Error(res.statusText);
      }
    });
  }
}
