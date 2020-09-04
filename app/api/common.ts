export const defaultHeaders: RequestInit = {
  method: 'GET',
  credentials: 'same-origin',
};

export function handleRequestErrors(response: Response): Response {
  if (!response.ok) {
    throw new Error(
      `Status: ${response.status}. Message: ${response.statusText}`
    );
  }
  return response;
}

export async function handleApiErrors<T>(response: Response): Promise<T> {
  const json = await response.json();
  if (json.error) {
    throw new Error(`${json.message}`);
  }
  return json;
}
