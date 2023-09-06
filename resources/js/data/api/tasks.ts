import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSearchContext } from '../contexts/search.tsx'
import { TCreateTasks, TTask, TTaskSelect } from '../../utils/types.ts'

export function useTasksCreationMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: TCreateTasks) => {
            return axios.post('/api/create', data)
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['tasks'])
        },
    })
}

export function useTasksQuery() {
    const { sortType, search } = useSearchContext()
    return useQuery({
        queryKey: ['tasks', sortType, search],
        queryFn: async () => {
            const res = await axios.get<{ data: TTask[] }>('/api/list', {
                params: {
                    sort: sortType,
                    search,
                },
            })
            // Сортированные списки в JS оптимизированы лучше, чем несортированные
            return res.data?.data?.sort() || []
        },
        // Слишком много обновлений не нужно, не реал-тайм приложение
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
}

export function useTasksDeleteMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: TTaskSelect) => {
            return axios.delete(`/api/task/${data.id}`)
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['tasks'])
        },
    })
}

export function useTaskStatusTriggerMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: TTaskSelect) => {
            return axios.patch(`/api/trigger/${data.id}`)
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['tasks'])
        },
    })
}
