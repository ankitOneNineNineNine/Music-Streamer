import axios from 'axios';


const reqheaders = {
    'ContentType': 'application/json'
}
const reqheadersWithToken = {
    'ContentType': 'application/json',
    'Authorization': localStorage.getItem('token')
}
const http = axios.create({

    // baseURL:  process.env.REACT_APP_BASE_URL,
    baseURL: 'http://localhost:1250',
    responseType: 'json'
})
/**
 * http get request
 * @param {string} url 
 * @param {object} headers 
 */
function get(url, { headers = reqheaders, params = {}, responseType = 'json' } = {}, secured = false) {

    return http({
        method: "GET",
        url,
        headers: secured ? reqheadersWithToken : reqheaders,
        params,
        responseType
    })
        .then(data => data.data)
        .catch(err => err.response);
}

function put(url, { headers = reqheaders, body = {}, params = {}, responseType = 'json' } = {}, secured = false) {
  
    return http({
        method: "PUT",
        url,
        headers: secured ? reqheadersWithToken : reqheaders,
        data: body,
        params,
        responseType
    })
        .then(data => data)
}

function post(url, { headers = reqheaders, body = {}, params = {}, responseType = 'json' } = {}, secured = false) {

    return http({
        method: "POST",
        url,
        headers: secured ? reqheadersWithToken : reqheaders,
        data: body,
        params,
        responseType
    })
        .then(data => data.data);

}

function remove(url, { headers = reqheaders, params = {}, responseType = 'json' } = {}, secured = false) {

    return http({
        method: "DELETE",
        url,
        headers: secured ? reqheadersWithToken : reqheaders,
        params,
        responseType
    })
        .then(data => data.response)
        .catch(err => err.response);
}

function upload(method, url, data, files) {
    const promise = new Promise((resolve, reject) => {
        debugger;
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        if (files && files.length) {
            formData.append('img', files[0], files[0].name)
        }
        for (let key in data) {
            formData.append(key, data[key]);
        }
       
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.response);
                }
            }
        }

        xhr.open(method, url, true);
        xhr.send(formData);
    });
    return promise;
}


export default {
    get,
    post,
    put,
    delete: remove,
    upload
}