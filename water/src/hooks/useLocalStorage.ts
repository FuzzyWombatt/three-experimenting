import { useState, useCallback } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (newValue: T) => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const value = window.localStorage.getItem(key)

            if (value) {
                return JSON.parse(value)
            } else {
                window.localStorage.setItem(key, JSON.stringify(initialValue))

                return initialValue
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(`error occured while setting local storage for key[${key}]: `, error.message)
            }

            return initialValue
        }
    })

    const setNewValue = useCallback(
        (newValue: T) => {
            try {
                window.localStorage.setItem(key, JSON.stringify(newValue))
            } catch (error) {
                if (error instanceof Error) {
                    console.error('error occured while saving new value: ', error.message)
                }
            }

            setStoredValue(() => newValue)
        },
        [key]
    )

    return [storedValue, setNewValue]
}
