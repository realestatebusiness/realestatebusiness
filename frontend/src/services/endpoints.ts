import api from './app'

export const postRequest=<T>(endpoint:string,data:any):Promise<T>=>{
    return api.post(endpoint,data)
    .then(response=>response.data as T)
    .catch(error=>{
        console.log('Error during post request',error)
        throw error;
    })
}

export const postFormDataRequest =async <T>(endpoint:string,data:FormData):Promise<T>=>{
return api.post(endpoint,data,{
    headers:{'Content-Length':'multipart/form-data'}
})
.then((response)=>response.data as T)
.catch((error)=>{
    console.log('Error during post request with Formdata',error);
    throw error;
})

};

export const getRequest=<T>(endpoint:string,config:any):Promise<T>=>{
return api.get(endpoint,config)
.then(response=>response.data as T)
.catch(error=>{
    console.log('Error during Get request',error);
    throw error;
})

}

export const putRequest = <T>(endpoint: string, data: any): Promise<T> => {
  return api.put(endpoint, data)
    .then((response) => response.data as T)
    .catch((error) => {
      console.log('Error during PUT request', error);
      throw error;
    });
};



