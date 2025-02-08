const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const groupService = {
  getGroups,
  getGroup,
  createGroup,
  deleteGroup,
  editGroup,
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

function getGroup (token, groupName) {
  return fetch(`${API_URL}/api/group?name=${groupName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch group ${groupName}`);
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
    return response.text().then((text) => {
      return text ? JSON.parse(text) : {};
    });
  });
}

function deleteGroup (token, groupName) {
  return fetch(`${API_URL}/api/group/delete?name=${groupName}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }).then((response) => {
    if (!response.ok || response.status !== 204) {
      throw new Error("Failed to create group");
    }
    return response.text().then((text) => {
      return text ? JSON.parse(text) : {};
    });
  });
}

function editGroup (token, groupName, announcement = null, startOfTheDay = null, maxMembers = null, strikeLimit = null) {
  const params = new URLSearchParams();
  params.append("name", groupName);
  if (announcement !== null) params.append("announcement", announcement);
  if (startOfTheDay !== null) params.append("startOfTheDay", startOfTheDay);
  if (maxMembers !== null) params.append("maxMembers", maxMembers);
  if (strikeLimit !== null) params.append("strikeLimit", strikeLimit);

  return fetch(`${API_URL}/api/group/edit?${params.toString()}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to edit group");
    }
    return response.json();
  });
}