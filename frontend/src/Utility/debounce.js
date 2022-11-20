const debounce=(callback,delay)=>{
    let timer;
    return function(){
        timer&&clearTimeout(timer)
        timer=setTimeout(() => {
            callback();
        }, delay);
    }
}
export default debounce