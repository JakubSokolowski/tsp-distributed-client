type HTTPAuthHeader = {
  Authorization?: string
};

export function getAuthHeader(): HTTPAuthHeader {
  const user = JSON.parse(<string>localStorage.getItem('user'));
  if (user && user.token)
    return { Authorization: 'Bearer ' + user.token };
  return {};
}

