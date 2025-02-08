const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const memberService = {
    getMembers,
    getMember,
    createMember,
    deleteMember,
    editMember,
}

function getMembers(token) {
    return fetch(`${API_URL}/api/members`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch members");
        }
        return response.json();
    });
}

function getMember(token, memberName) {
    return fetch(`${API_URL}/api/member?name=${memberName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to fetch member ${memberName}`);
        }
        return response.json();
    });
}

function createMember(token, name, email) {
    return fetch(`${API_URL}/api/member/register?name=${name}&email=${email}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to create member");
        }
        return response.json();
    });
}

function deleteMember(token, memberName) {
    return fetch(`${API_URL}/api/member/delete?name=${memberName}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        if (!response.ok || response.status !== 204) {
            throw new Error("Failed to delete member");
        }
        return response.text().then((text) => {
            return text ? JSON.parse(text) : {};
        });
    });
}

function editMember(token, memberName, memberEmail) {
    return fetch(`${API_URL}/api/member/edit?name=${memberName}&email=${memberEmail}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to edit member");
        }
        return response.json();
    });
}