import { useSearchContext } from '../../data/contexts/search.tsx'
import { ChangeEvent, useEffect, useState } from 'react'

import { isSortType } from '../../utils/types.ts'

export function SearchForm() {
    const { sortType, search, setSortType, setSearch } = useSearchContext()
    const [updatedSearch, setUpdatedSearch] = useState<string>('')
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(updatedSearch.trim())
        }, 350)

        return () => clearTimeout(handler)
    }, [search, setSearch, setSortType, updatedSearch])
    const onSearchStringChange = function (event: ChangeEvent) {
        const newValue = (event.target as HTMLInputElement).value
        if (newValue === search) {
            return
        }
        setUpdatedSearch(newValue)
    }
    const onSortTypeChange = function (event: ChangeEvent<HTMLSelectElement>) {
        const newSortType = event.target.value
        if (newSortType === sortType) {
            return
        }
        if (!isSortType(newSortType)) {
            return
        }
        setSortType(newSortType)
    }
    return (
        <div className="flex justify-center gap-2 mb-12 flex-col sm:flex-row mt-4">
            <input
                type="text"
                placeholder="Поиск..."
                className="border border-gray-500 rounded-md rounded-tr-box ring-0 px-2 py-1 h-12 self-center resize-none shadow focus:shadow-lg"
                onChange={onSearchStringChange}
            />
            <select
                className="border border-gray-500 rounded-md rounded-tr-box ring-0 px-2 py-1 h-12 self-center resize-none shadow focus:shadow-lg bg-white"
                onChange={onSortTypeChange}
            >
                <option value="new">Новые</option>
                <option value="old">Старые</option>
                <option value="done">Выполненные</option>
                <option value="undone">Невыполненные</option>
            </select>
        </div>
    )
}
