import { CreateTaskForm } from './components/logic/createTaskForm.tsx'
import { TodoList } from './components/logic/todoList.tsx'
import { SearchContextProvider } from './data/contexts/search.tsx'
import { SearchForm } from './components/logic/searchForm.tsx'

export function App() {
    return (
        <SearchContextProvider>
            <CreateTaskForm />
            <SearchForm />
            <TodoList />
        </SearchContextProvider>
    )
}
