import {
    useTasksDeleteMutation,
    useTaskStatusTriggerMutation,
} from '../../data/api/tasks.ts'
import { TTask } from '../../utils/types.ts'
import { useMemo } from 'react'

type TTodoItemProps = {
    item: TTask
}

export function TodoItem({ item }: TTodoItemProps) {
    const deleteMutation = useTasksDeleteMutation()
    const triggerMutation = useTaskStatusTriggerMutation()
    const onDeleteClick = () => {
        deleteMutation.mutate({ id: item.id })
    }
    const onTriggerClick = () => {
        // Обновляем заранее, надеемся, что сеть у клиента работает нормально
        item.status = !item.status
        triggerMutation.mutate(
            { id: item.id },
            {
                onError: () => {
                    // Если запрос не удался, откатываем изменения
                    item.status = !item.status
                },
            }
        )
    }
    const time = useMemo(() => {
        const date = new Date(item.createdAt)
        return date.toLocaleString()
    }, [item])

    return (
        <li
            className={
                'border border-gray-500 rounded-md rounded-tr-box ring-0 px-2 py-1 min-w-full self-center resize-none shadow focus:shadow-lg container ' +
                (deleteMutation.isLoading && 'opacity-40') +
                (item.status && ' bg-green-100')
            }
        >
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-sm break-words whitespace-break-spaces">
                {item.description}
            </p>
            <div className="flex">
                Создано: {time}
                <div className="ml-auto w-fit">
                    <button
                        className="text-red-500 hover:text-red-600"
                        onClick={onDeleteClick}
                    >
                        Удалить
                    </button>
                    <button
                        className="text-blue-600 ms-4 hover:text-blue-700"
                        onClick={onTriggerClick}
                    >
                        {item.status
                            ? 'Отметить как невыполненное'
                            : 'Отметить как выполненное'}
                    </button>
                </div>
            </div>
        </li>
    )
}
