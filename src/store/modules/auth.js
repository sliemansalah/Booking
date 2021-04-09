const actions = {
  login({}, data) {
    return new Promise((resolve, reject) => {
       let form = new FormData();
       if( data.email) form.append('email', data.email);
       if( data.password) form.append('password', data.password);
      axios.post(window.server_url + `/api/admin/auth/login`, form)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  logout({}) {
    return new Promise((resolve, reject) => {
      axios.post(window.server_url + `/api/admin/auth/logout`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  
}
export default {
  namespaced: true,
  actions,
}
