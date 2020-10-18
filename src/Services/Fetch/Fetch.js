import API from '../../Constants';

class Fetch {

    constructor(baseAPI) {

        if(baseAPI) {
            this.baseAPI = baseAPI
        } else {
            this.baseAPI = API.BASEAPI
        }

        this.headers = new Headers({
            'AuthToken': 'Kvn9kUMMyzk5IiWYpKNa7z3q6pxEMY9f', 
        })

    }
    get(path) {

        return new Promise((resolve,reject)=>{
            const config = {
                method:'GET',
                headers: this.headers
            }
            fetch(`${this.baseAPI}${path}`,config).then((res)=>{
                const response = res
                response.json().then((result)=>{
                   resolve(result);
                }) 
            
            }).catch((err)=>{
                reject(err)
            });
        });

    }

    post(path,data) {
        return new Promise((resolve,reject)=>{
            const config = {
                method:'POST',
                headers: this.headers,
                body:data
            }
            fetch(`${this.baseAPI}${path}`,config).then((res)=>{
                const response = res
                response.json().then((result)=>{
                   resolve(result);
                }) 
            
            }).catch((err)=>{
                reject(err)
            });
        });

    }
    delete(path) {
        return new Promise((resolve,reject)=>{
            const config = {
                method:'DELETE',
                headers: this.headers
            }
            fetch(`${this.baseAPI}${path}`,config).then((res)=>{
                const response = res
                response.json().then((result)=>{
                   resolve(result);
                }) 
            
            }).catch((err)=>{
                reject(err)
            });
        });

    }
}
export default  Fetch;




