export type TCreateTasks = {
    title: string
    description: string
}
export type TTask = {
    id: number
    title: string
    description: string
    status: boolean
    createdAt: string
}
export type ESortType = 'new' | 'old' | 'done' | 'undone'
export type TTaskSelect = {
    id: number
}

export function isSortType(value: string): value is ESortType {
    switch (value) {
        case 'new': {
            return true
        }
        case 'old': {
            return true
        }
        case 'done': {
            return true
        }
        case 'undone': {
            return true
        }
    }
    return false
}
