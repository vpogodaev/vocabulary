export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const httpFetch = async <T extends unknown = undefined>(
  url: string,
  method: Methods = Methods.GET,
  data?: unknown,
): Promise<T> => {
  try {
    const params = {
      method,
      body: method !== Methods.GET && data ? JSON.stringify(data) : null,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return await response.json();
  } catch (e: unknown) {
    throw e;
  }
};