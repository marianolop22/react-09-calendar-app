import { useEffect, useRef, useState } from "react"


export const useFetch = ( url ) => {

    const isMounted = useRef(true);

    const [state, setState] = useState({
        data:null,
        loading: true,
        error: null
    });

    useEffect ( ()=> {
        return () => { // esto va a ejecutar cuando el componente se mata, entonces hay que romper la referencia
                        // y no ejecutaar el setState
            isMounted.current = false
        }
    },[]); //al poner [] esto se ejecuta cuando se inicia  por primera vez el component


    useEffect( ()=> {

        setState ({
            data:null,
            loading: true,
            error: null
        });

        fetch(url)
            .then ( resp => resp.json() )
            .then ( data => {
                if ( isMounted.current ) {
                    setState ({
                        loading: false,
                        error: null,
                        data
                    });
                } 
            })
            .catch( ()=> {
                setState ({
                    loading: false,
                    error: 'No se pudo cargar la info',
                    data: null
                });
            })
    },[url]) //esto es para que se ejecute solo cuando la url cambia

    return state;
}