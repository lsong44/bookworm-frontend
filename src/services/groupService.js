const API_URL = "http://localhost:8080";

export const groupService = {
  getGroups,
  createGroup
}

function getGroups (token) {
  
  return fetch(`${API_URL}/api/groups`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch groups");
    }
    return response.json();
  });

}

function createGroup (token, groupName) {
  return fetch(`${API_URL}/api/group/register?name=${groupName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create group");
    }
    return response.json();
  });
}