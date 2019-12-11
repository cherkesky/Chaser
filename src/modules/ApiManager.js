const baseUrl = 'http://localhost:5002';

export default {
  get(endpoint, id, params = "") {
    // pass extra optional 'params' to be included after the '?' in the fetch call
    // ex. "_embed=user" or "sort=timestamp"
    return fetch(`${baseUrl}/${endpoint}/${id}?${params}`).then((result) => result.json());
  },
  getAll(endpoint, params = "") {
    return fetch(`${baseUrl}/${endpoint}?${params}`).then((result) => result.json());
  },
  getLoggedInuser(params = "") {
    return fetch(`${baseUrl}/users?email=${params}`).then((result) => result.json());
  },
  delete(endpoint, id) {
    return fetch(`${baseUrl}/${endpoint}/${id}`, {
      method: 'DELETE'
    }).then((result) => result.json());
  },
  post(endpoint, newObject) {
    return fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newObject)
    }).then(data => data.json())
  },
  update(endpoint, editedObj) {
    // make sure to pass in the ID in the 'editedObj' so you can access it in the fetch call
    return fetch(`${baseUrl}/${endpoint}/${editedObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedObj)
    }).then(data => data.json());
  }
};
