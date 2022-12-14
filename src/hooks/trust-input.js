import { useState, useEffect } from 'react'
import { verifyAddress } from '../libs/utils';

const useTrustInput = (initialValue, isAddress) => {

    const [value, setValue] = useState(initialValue)
    const [isValid, setIsValid] = useState(null)
    const [isTouched, setIsTouched] = useState(false)

;
    const hasError = !isValid //&& isTouched;

    const onChange = (event) => {
        setValue(event.target.value)
        setIsTouched(true)
    }

    const onBlur = (event) => {
        setIsTouched(true)
    }

    useEffect(() => {

        if (isAddress) {
            setIsValid(verifyAddress(value))
        } else {
            setIsValid(typeof Number(value) == 'number')
        }

    }, [isAddress, value]);


    return { value, isValid, hasError, onChange, onBlur}
}

export default useTrustInput