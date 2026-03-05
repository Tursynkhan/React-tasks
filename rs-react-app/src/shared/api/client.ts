export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}
export class HttpError extends Error {
  public response: Response;
  public apiMessage: string;

  constructor(response: Response, message: string, apiMessage: string) {
    super(message);
    this.name = 'HttpError';
    this.response = response;
    this.apiMessage = apiMessage;
  }
}

export class FetchWrapper {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const apiMessage = errorData?.message || 'Request failed';
      throw new HttpError(
        response,
        `HTTP error! status: ${response.status}. Details: ${JSON.stringify(errorData)}`,
        apiMessage
      );
    }

    const data: T = await response.json();
    return data;
  }

  public get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  public post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  public put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  public delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

const API_URL = import.meta.env.VITE_API_BASE_URL;
export const apiClient = new FetchWrapper(API_URL);
