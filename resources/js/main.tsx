import * as ReactDOM from 'react-dom/client'
import { App } from './app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

void (function () {
    const mainElement = document.body.querySelector('main')
    if (!mainElement) {
        alert('Ошибка запуска веб-приложения')
        return
    }
    const reactRoot = ReactDOM.createRoot(mainElement)
    const queryClient = new QueryClient()
    reactRoot.render(
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )
})()
