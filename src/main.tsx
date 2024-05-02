import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

//TODO: в queryClient мы можем изменить настройки сразу для всех запросов, на корневом уровне
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			//TODO: retry - означает количество попыток, сколько будет повторяться запрос, если он был неуспешен
			retry: 5
		}
	}
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<App/>
		<ReactQueryDevtools initialIsOpen={false}/>
	</QueryClientProvider>
)
