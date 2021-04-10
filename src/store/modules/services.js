const actions = {
  getData({}, queryParams) {

    return new Promise((resolve, reject) => {
      window.axios.get(window.server_url + `/api/admin/service`, {
        params: queryParams
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  findData({}, id) {
    return new Promise((resolve, reject) => {
        window.axios.get(window.server_url + `/api/admin/service/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  saveData({}, data) {
    return new Promise((resolve, reject) => {
       let form = new FormData();
       if( data.name) form.append('name', data.name);
      window.axios.post(window.server_url + `/api/admin/service`, form)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  updateData({}, data) {
    return new Promise((resolve, reject) => {
       let form = new FormData();
       if( data.name) form.append('name', data.name);
      window.axios.post(window.server_url + `/api/admin/service/${data.id}/user`, form)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  
  removeData({}, id) {
    return new Promise((resolve, reject) => {
        window.axios.delete(window.server_url + `/api/admin/service/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  
}
export default {
  namespaced: true,
  actions,
}
