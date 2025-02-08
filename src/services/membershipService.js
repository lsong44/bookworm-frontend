const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const membershipService = {
  getMembershipByMember,
  getMembershipByGroup,
  getMembershipByKeys,
  addMembership,
  deleteMembership,
  editMembership,
  cleanUpMembership,
  promoteWaitlister,
}

function getMembershipByMember (token, memberName) {
  
  return fetch(`${API_URL}/api/membership/member?memberName=${memberName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch membership");
    }
    return response.text().then((text) => {
        return text ? JSON.parse(text) : {};
      });
  });
}

function getMembershipByGroup (token, groupName) {
  
    return fetch(`${API_URL}/api/membership/group?groupName=${groupName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch membership");
      }
      return response.text().then((text) => {
        return text ? JSON.parse(text) : {};
      });
    });
  
  }

function getMembershipByKeys (token, memberName, groupName) {

    return fetch(`${API_URL}/api/membership?memberName=${memberName}&groupName=${groupName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch membership");
        }
        return response.text().then((text) => {
            return text ? JSON.parse(text) : {};
          });
    });
}


function addMembership (token, memberName, groupName, roleName) {
  return fetch(`${API_URL}/api/membership/add?groupName=${groupName}&memberName=${memberName}&roleName=${roleName}`, {
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

function deleteMembership (token, groupName, memberName, roleName = null) {
  return fetch(`${API_URL}/api/membership/delete?groupName=${groupName}&memberName=${memberName}&roleName=${roleName}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }).then((response) => {
    if (!response.ok || response.status !== 204) {
      throw new Error(`Failed to delete membership ${groupName}, ${memberName}, ${roleName}`);
    }
    return response.text().then((text) => {
      return text ? JSON.parse(text) : {};
    });
  });
}

function editMembership (token, groupName) {

  return fetch(`${API_URL}/api/membership/promote/batch?groupName=${groupName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to promote waitlist for group ${groupName}`);
    }
    return response.text().then((text) => {
        return text ? JSON.parse(text) : {};
      });
  });
}

function cleanUpMembership (token, groupName, deadlineDate = null) {

  return fetch(`${API_URL}/api/membership/cleanup?groupName=${groupName}&deadlineDate=${deadlineDate}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to clean up members for group ${groupName}`);
    }
    return response.text().then((text) => {
        return text ? JSON.parse(text) : {};
      });
  });
}

function promoteWaitlister(token, groupName) {
    return fetch(`${API_URL}/api/membership/promote?groupName=${groupName}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to promote waitlisters for group ${groupName}`);
        }
        return response.text().then((text) => {
            return text ? JSON.parse(text) : {};
          });
    });
}