import { RequestFactory } from './request-factory';

export function initMockBackend() {
  window.fetch = function (url: string, opts: RequestInit): Promise<any> {
    return new Promise(() => {
      setTimeout(() => {
        return RequestFactory.createRequest(url, opts);
      }, 500);
    });
  };
}
