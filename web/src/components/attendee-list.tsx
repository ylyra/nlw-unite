import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import debounce from 'lodash/debounce'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from 'lucide-react'
import { Fragment, useCallback, useState } from 'react'
import { api } from '../services/api'
import { IconButton } from './icon-buttont'
import { Skeleton } from './skeleton'
import {
  Table,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

type Attendee = {
  id: number
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
}

dayjs.extend(relativeTime)
dayjs.locale('pt-br')
export function AttendeeList() {
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.href)
    const page = url.searchParams.get('page')

    return url.searchParams.has('page') ? Number(page) : 1
  })
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.href)
    const search = url.searchParams.get('search')

    return search || ''
  })

  const { data, refetch, isFetching } = useQuery({
    queryKey: ['attendees', page],
    queryFn: async () => {
      const response = await api.get<{
        attendees: Attendee[]
        total: number
      }>('/events/h3991hlro97uk3wp62jqt0zw/attendees', {
        params: {
          pageIndex: page - 1,
          ...(search.length > 0 && { query: search }),
        },
      })

      return response.data
    },
    initialData: {
      attendees: [],
      total: 0,
    },
  })
  const totalPages = Math.ceil(data.total / 10)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setPage(1)
      const url = new URL(window.location.href)
      url.searchParams.set('search', value)
      window.history.pushState({}, '', url.toString())

      refetch()
    }, 500),
    [],
  )

  function setCurrentPage(page: number) {
    const url = new URL(window.location.href)
    url.searchParams.set('page', page.toString())
    setPage(page)
    window.history.pushState({}, '', url.toString())
  }

  return (
    <section className="py-2">
      <div className="container space-y-4">
        <div className="flex items-center flex-wrap gap-3">
          <h1 className="text-2xl font-bold">Participantes</h1>

          <div className="px-3 flex items-center border border-white/10 rounded-lg max-w-72 w-full focus-within:ring-2 focus-within:ring-emerald-300 focus-within:ring-offset-4 focus-within:ring-offset-zinc-950 transition-all duration-200 ease-linear">
            <Search className="size-4 text-emerald-300" />
            <input
              type="text"
              className="bg-transparent outline-none border-none py-1.5 focus:outline-none focus:ring-0 text-sm placeholder:text-zinc-400"
              placeholder="Buscar participante..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)

                debouncedSearch(e.target.value)
              }}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  className="size-4 bg-black/20 rounded border-white/10 text-orange-400 focus:ring-offset-zinc-950 focus:ring-orange-400"
                />
              </TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Participante</TableHead>
              <TableHead>Data de inscrição</TableHead>
              <TableHead>Data do check-in</TableHead>
              <TableHead className="w-16" />
            </TableRow>
          </TableHeader>

          <tbody>
            {isFetching && (
              <Fragment>
                {Array.from({
                  length: 10,
                }).map((_, idx) => (
                  <TableRow
                    key={`loading-attendee-${idx}`}
                    className="border-b border-white/10"
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        className="size-4 bg-black/20 rounded border-white/10 text-orange-400 focus:ring-offset-zinc-950 focus:ring-orange-400"
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-9" />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-px">
                        <Skeleton className="w-32 h-4" />
                        <Skeleton className="w-24 h-4" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-24 h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-24 h-4" />
                    </TableCell>
                    <TableCell>
                      <IconButton className="bg-black/20" disabled>
                        <MoreHorizontal className="size-4" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            )}

            {!isFetching &&
              data.attendees.map((item) => (
                <TableRow key={item.id} className="border-b border-white/10">
                  <TableCell>
                    <input
                      type="checkbox"
                      className="size-4 bg-black/20 rounded border-white/10 text-orange-400 focus:ring-offset-zinc-950 focus:ring-orange-400"
                    />
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <div>
                      <span className="text-zinc-50 font-semibold block">
                        {item.name}
                      </span>
                      <span>{item.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(item.createdAt)}</TableCell>
                  <TableCell>
                    {item.checkedInAt ? (
                      dayjs().to(item.checkedInAt)
                    ) : (
                      <span className="text-zinc-500">Não fez check-in</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton className="bg-black/20">
                      <MoreHorizontal className="size-4" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </tbody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                Mostrando {data.attendees.length} de {data.total} participantes
              </TableCell>

              <TableCell className="text-right " colSpan={3}>
                <div className="flex items-center justify-end gap-8">
                  <p>
                    Página {page} de {Math.ceil(data.total / 10)}
                  </p>

                  <div className="flex items-center gap-1.5">
                    <IconButton
                      onClick={() => setCurrentPage(1)}
                      disabled={page === 1}
                    >
                      <ChevronsLeft className="size-4" />
                    </IconButton>

                    <IconButton
                      onClick={() => setCurrentPage(Math.max(page - 1, 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="size-4" />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        setCurrentPage(Math.min(page + 1, totalPages))
                      }
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="size-4" />
                    </IconButton>

                    <IconButton
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={page === totalPages}
                    >
                      <ChevronsRight className="size-4" />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  )
}
