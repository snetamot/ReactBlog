import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data,setData] = useState(null)
    const[isPending, setIsPending] = useState(true);
    const[error, setError] = useState(null);
    //runs only once when rendered
    useEffect(() => {
        const abortCont = new AbortController();
        fetch(url, {signal:abortCont.signal})
                .then(res => {
                    if(!res.ok) {
                        throw Error('couldn\'t fetch data for that resource')
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError' ){
                        console.log('fetch aborted');
                    }else{
                        setIsPending(false);
                        setError(err.message);
                    }
                })
        return () => abortCont.abort();
    }, [url]);
    //whenever url changes rerun this function to get data from that endpoint
    return {data, isPending, error}
}

export default useFetch;
