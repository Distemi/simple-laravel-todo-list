import React, { useContext, useState } from 'react'
import { ESortType } from '../../utils/types.ts'

type TSearchContextState = {
    sortType: ESortType
    search: string
    setSortType: (sortType: ESortType) => void
    setSearch: (search: string) => void
}

const sortContext = React.createContext<TSearchContextState>(null!)

export function SearchContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [sortType, setSortType] = useState<ESortType>('new')
    const [search, setSearch] = useState<string>('')

    return (
        <sortContext.Provider
            value={{ sortType, search, setSortType, setSearch }}
        >
            {children}
        </sortContext.Provider>
    )
}

export function useSearchContext() {
    return useContext(sortContext)
}
