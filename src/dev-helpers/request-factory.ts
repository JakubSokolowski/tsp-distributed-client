import { RequestType } from './request-type';

type User = {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  id: number
};

class RequestFactory {
  static users: User[] = JSON.parse(<string>localStorage.getItem('users')) || [];
  static realFetch: Function = window.fetch;
  constructor() {}

  static createRequest(url: string, opts: RequestInit) {
    const request = this.assignRequestType(url, opts);
    switch (request) {
      case RequestType.GET_USERS:
        return this.getUsers(url, opts);
      case RequestType.GET_USER_BY_ID:
        return this.getUserById(url, opts);
      case RequestType.AUTHENTICATE_USER:
        return this.authenticateUser(url, opts);
      case RequestType.REGISTER_USER:
        return this.registerUser(url, opts);
      case RequestType.DELETE_USER:
        return this.deleteUser(url, opts);
      default:
        return this.realFetch(url, opts).then((response: any) => Promise.resolve(response));
    }
  }
  private static assignRequestType(url: string, opts: RequestInit): RequestType | undefined {
    if (url.endsWith('/users/authenticate') && opts.method === 'POST')
      return RequestType.AUTHENTICATE_USER;
    if (url.endsWith('/users'))
      return RequestType.GET_USERS;
    if (url.match(/\/users\/\d+$/) && opts.method === 'GET')
      return RequestType.GET_USER_BY_ID;
    if (url.endsWith('/users/register') && opts.method === 'POST')
      return RequestType.REGISTER_USER;
    if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE')
      return RequestType.DELETE_USER;
  }

  static authenticateUser(url: string, opts: RequestInit): Promise<any> {
    // get parameters from post request
    let params = JSON.parse(opts.body);

    // find if any user matches login credentials
    let filteredUsers = this.users.filter(user => {
      return user.username === params.username && user.password === params.password;
    });

    if (filteredUsers.length) {
      // if login details are valid return user details and fake jwt token
      let user = filteredUsers[0];
      let responseJson = {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      };
      return Promise.resolve({ok: true, text: () => Promise.resolve(JSON.stringify(responseJson))});
    } else {
      // else return error
      return Promise.reject('Username or password is incorrect');
    }
  }

  static registerUser(url: string, opts: RequestInit): Promise<any> {
    let newUser = JSON.parse(opts.body);

    let duplicateUser = this.users.filter(user => {
      return user.username === newUser.username;
    }).length;
    if (duplicateUser) {
      return Promise.reject('Username "' + newUser.username + '" is already taken');
    }

    newUser.id = this.users.length ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return Promise.resolve({ok: true, text: () => Promise.resolve()});
  }

  static deleteUser(url: string, opts: RequestInit): Promise<any> {
    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
      // find user by id in users array
      let urlParts = url.split('/');
      let id = parseInt(urlParts[urlParts.length - 1]);
      for (let i = 0; i < this.users.length; i++) {
        let user = this.users[i];
        if (user.id === id) {
          // delete user
          this.users.splice(i, 1);
          localStorage.setItem('users', JSON.stringify(this.users));
          break;
        }
      }
      // respond 200 OK
      return Promise.resolve({ok: true, text: () => Promise.resolve()});
    } else {
      // return 401 not authorised if token is null or invalid
      return Promise.reject('Unauthorised');
    }
  }

  static getUsers(url: string, opts: RequestInit): Promise<any> {
    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
      return Promise.resolve({ok: true, text: () => Promise.resolve(JSON.stringify(this.users))});
    } else {
      // return 401 not authorised if token is null or invalid
      return Promise.reject('Unauthorised');
    }
  }

  static getUserById(url: string, opts: RequestInit): Promise<any> {
    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
      // find user by id in users array
      let urlParts = url.split('/');
      let id = parseInt(urlParts[urlParts.length - 1]);
      let matchedUsers = this.users.filter(user => {
        return user.id === id;
      });
      let user = matchedUsers.length ? matchedUsers[0] : undefined;

      // respond 200 OK with user
      return Promise.resolve({ok: true, text: () => JSON.stringify(user)});
    } else {
      // return 401 not authorised if token is null or invalid
      return Promise.reject('Unauthorised');
    }
  }

}

export { RequestFactory };
