import axios from 'axios';

const httpService = (path = undefined, type = 'GET', payloads = {}) => {

    const requestHeaders = {'content-type': 'multipart/form-data','Accept':'application/json'} 
    // const requestHeaders = {'Accept':'application/json'}; 
    
    console.log({'filename': payloads.name});
    console.log({'axios request': axios({method: type, url: path, headers: requestHeaders, data: payloads})});

    return axios({method: type, url: path, headers: requestHeaders, file: payloads});
}
export default httpService;