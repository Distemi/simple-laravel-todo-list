import { useTasksQuery } from '../../data/api/tasks.ts'
import { useDeferredValue } from 'react'
import { TodoItem } from './todoItem.tsx'

export function TodoList() {
    const { data, isError } = useTasksQuery()
    const taskList = useDeferredValue(data)
    if (isError) {
        return <div>Ошибка, попробуйте обновить страницу</div>
    }
    if (typeof taskList === 'undefined') {
        return <span className="text-center block">Загрузка...</span>
    }
    return (
        <ul className="flex flex-col justify-center gap-2">
            {taskList?.map((task, index) => (
                <TodoItem key={index} item={task} />
            ))}
        </ul>
    )
}
