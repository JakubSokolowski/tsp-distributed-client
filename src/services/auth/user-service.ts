import { getAuthHeader } from './auth-header';
import Config from '../../config.json';
import { User } from './user';
import { getStoreAccessors } from 'vuex-typescript';

class UserService {
  login(username: string, password: string): Promise<any> {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };

    return fetch(`${Config.apiUrl}/users/authenticate`, requestOptions)
      .then(this.handleResponse)
      .then(user => {
        // login successful if there's a jwt token in the response
        if (user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
        }

        return user;
      });
}

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
  }

  register(user: User): Promise<any> {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    return fetch(`${Config.apiUrl}/users/register`, requestOptions).then(this.handleResponse);
  }

  getAll(): Promise<any> {
    const requestOptions = {
      method: 'GET',
      headers: getAuthHeader()
    };
    return fetch(`${Config.apiUrl}/users`, requestOptions).then(this.handleResponse);
  }

  getById(id: number): Promise<any> {
    const requestOptions = {
      method: 'GET',
      headers: getAuthHeader()
    };

    return fetch(`${Config.apiUrl}/users/${id}`, requestOptions).then(this.handleResponse);
}

  update(user: User): Promise<any> {
    const requestOptions = {
      method: 'PUT',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    return fetch(`${Config.apiUrl}/users/${user.id}`, requestOptions).then(this.handleResponse);
}

  _delete(id: number) {
    const requestOptions = {
      method: 'DELETE',
      headers: getAuthHeader()
    };

    return fetch(`${Config.apiUrl}/users/${id}`, requestOptions).then(this.handleResponse);
}

  handleResponse(response: any) {
    return response.text().then((text: string) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          this.logout();
          location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
  });
  }
}
export { UserService };
