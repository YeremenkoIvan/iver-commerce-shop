import { API_BASE_URL } from "../constants";

export default function useApi() {
  const publicFetch = async (url, params) => {
    const _url = `${API_BASE_URL}/${url}`;
    const _params = {
      ...params,
      headers: {
        "Content-type": "application/json",
        ...params?.headers,
      },
    };

    return await fetch(_url, _params).then((response) => {
      if (response.ok) {
        return response.json();
      }

      return response.json().then((data) => {
        throw new Error(JSON.stringify(data));
      });
    });
  };
  const authFetch = async (url, params = {}) => {
    const token = localStorage.getItem("user");
    const _url = `${API_BASE_URL}/${url}`;
    const _params = {
      ...params,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
        ...params?.headers,
      },
    };

    const res = await fetch(_url, _params);

    // Добавь это:
    if (!res.ok) {
      const message = await res.text(); // или res.json() если сервер всегда возвращает JSON
      throw new Error(`HTTP error! status: ${res.status}, message: ${message}`);
    }

    return res.json();
  };

  return { publicFetch, authFetch };
}
