export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const httpFetch = async <T = undefined>(
  url: string,
  data?: unknown,
  method: Methods = Methods.GET,
): Promise<T> => {
  const params = {
    method,
    body: method !== Methods.GET && data ? JSON.stringify(data) : null,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, params);

  // TODO: actually, !ok is also ok status: fix it
  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return await response.json();
};
