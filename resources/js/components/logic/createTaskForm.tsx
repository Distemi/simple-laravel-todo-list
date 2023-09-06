import { ChangeEvent, FormEvent, useState } from 'react'
import { useTasksCreationMutation } from '../../data/api/tasks.ts'
import { TCreateTasks } from '../../utils/types.ts'

export function CreateTaskForm() {
    const [formData, setFormData] = useState<TCreateTasks>({
        title: '',
        description: '',
    })
    const taskCreationMutation = useTasksCreationMutation()
    const onSubmit = function (event: FormEvent) {
        event.preventDefault()
        if (taskCreationMutation.isLoading) {
            return
        }
        taskCreationMutation.mutate(formData)
    }
    const onUpdate = function (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) {
        const name = event.target.name
        const value = event.target.value
        if (!name || !value) {
            return
        }
        setFormData((data) => ({
            ...data,
            [name]: value,
        }))
    }
    return (
        <form
            className="md:px-8 flex flex-col gap-4 justify-center mt-2"
            onSubmit={onSubmit}
        >
            <input
                type="text"
                name="title"
                id="title"
                placeholder="Заголовок"
                onChange={onUpdate}
                required
                className="border-gray-500 border bg-white rounded-md rounded-tr-box ring-0 px-2 py-1 w-96 sm:w-96 md:w-160 h-12 self-center shadow focus:shadow-lg"
                maxLength={255}
            />
            <textarea
                name="description"
                id="description"
                placeholder="Описание"
                required
                onChange={onUpdate}
                className="border-gray-500 border bg-white rounded-md rounded-tr-box ring-0 px-2 py-1 w-96 md:w-176 h-24 self-center resize-none shadow focus:shadow-lg"
                maxLength={2048}
            ></textarea>
            <input
                type="submit"
                value="Создать"
                className="border border-blue-400 bg-blue-600 px-6 py-2 max-w-fit self-center text-white rounded-md ring-0 shadow hover:shadow-lg cursor-pointer"
            />
        </form>
    )
}
