import { useEffect, useRef } from "react"

export const useKey = (key, callback) => {
    const callbackRef = useRef(callback)
    useEffect(() => {
        callbackRef.current = callback
    })



    useEffect(() => {
        const handle = (event) => {
            if (event.code === key) {
                callback()
            }
        }

        
        document.addEventListener("keypress", handle)
        return () => document.removeEventListener("keypress", handle)

    }, [key])
    
}
