import {useState , useContext , createContext} from 'react'


export const CaptainDataContext = createContext();



export const useCaptain = ()=>{
    const context = useContext(CaptainContext);
    if(!context) {
    throw new Error('useCaptain must be used in within a captainProvider')
}
  return context;
}



const CaptainContext = () => {

    const [captain , setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error , setError] = useState(null);


    const updateCaptain = (captainData) =>{ 
        setCaptain(captainData);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
    };

    return (
    <CaptainDataContext.Provider value={value}>CaptainContext</CaptainDataContext.Provider>
  )
}

export default CaptainContext;