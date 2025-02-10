const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const logService = {
  getLogs,
  addLog,
}

function getLogs(token, memberName) {
  return fetch(`${API_URL}/api/log?memberName=${memberName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch logs");
    }
    return response.text().then((text) => {
        return text ? JSON.parse(text) : {};
      });
  });
}

function addLog(token, memberName, title, comment=null) {
    let url=`${API_URL}/api/log/add?memberName=${memberName}&title=${title}`;
    if (comment!=null) {
        url+=`&comment=${comment}`;
    }
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to create log");
        }
        return response.text().then((text) => {
            return text ? JSON.parse(text) : {};
        });
    });
}