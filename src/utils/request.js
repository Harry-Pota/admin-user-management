export const request = {
  get: async (url) => {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  post: async (url, body) => {
    if (typeof body !== "object") return console.error("잘못된 요청입니다,");

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
  put: async (url, body) => {
    if (typeof body !== "object") return console.error("잘못된 요청입니다,");

    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
  delete: async (url) => {
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
