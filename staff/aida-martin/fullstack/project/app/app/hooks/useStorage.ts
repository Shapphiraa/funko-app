type StorageType = 'session' | 'local'

type UseStorageReturnValue = {
  getItem: (key: string, type?: StorageType) => string
}

const useStorage = (): UseStorageReturnValue => {
  const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')()

  const getItem = (key: string, type?: StorageType): string => {
    const storageType: 'localStorage' | 'sessionStorage' = `${
      type ?? 'session'
    }Storage`

    return isBrowser ? window[storageType][key] : ''
  }

  return {
    getItem,
  }
}

export default useStorage
