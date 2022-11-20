export default request={
    post:async(URL,credentials,data)=>{
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${URL}`,{
            method: 'POST',
            credentials: credentials && "include",
            body: JSON.stringify(data)
        });
        response=await response.json();
        return response;

    },
    get:async()=>{
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${URL}`,{
            method: 'GET',
            credentials: credentials && "include",
          });
        response=await response.json();
        return response;
    },
  
}