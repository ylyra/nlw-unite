import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from 'lucide-react'
import { useState } from 'react'
import { IconButton } from './icon-buttont'
import {
  Table,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

const items = Array.from({ length: 100 }).map((_, i) => ({
  id: '7e37bc62-3c87-4443-8512-1515576655c3'.concat(String(i)),
  code: '52716',
  name: 'João da Silva',
  email: 'joao@silva.com',
  createdAt: '7 dias atrás',
  checkedInAt: '3 dias atrás',
}))

export function AttendeeList() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const paginated = items.slice((page - 1) * 10, page * 10)

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
              onChange={(e) => setSearch(e.target.value)}
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
            {paginated.map((item) => (
              <TableRow key={item.id} className="border-b border-white/10">
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border-white/10 text-orange-400 focus:ring-offset-zinc-950 focus:ring-orange-400"
                  />
                </TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>
                  <div>
                    <span className="text-zinc-50 font-semibold block">
                      {item.name}
                    </span>
                    <span>{item.email}</span>
                  </div>
                </TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.checkedInAt}</TableCell>
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
                Mostrando {page * 10} de {items.length} participantes
              </TableCell>

              <TableCell className="text-right " colSpan={3}>
                <div className="flex items-center justify-end gap-8">
                  <p>
                    Página {page} de {Math.ceil(items.length / 10)}
                  </p>

                  <div className="flex items-center gap-1.5">
                    <IconButton
                      onClick={() => setPage(1)}
                      disabled={page === 1}
                    >
                      <ChevronsLeft className="size-4" />
                    </IconButton>

                    <IconButton
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="size-4" />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        setPage((prev) =>
                          Math.min(prev + 1, Math.ceil(items.length / 10)),
                        )
                      }
                      disabled={page === Math.ceil(items.length / 10)}
                    >
                      <ChevronRight className="size-4" />
                    </IconButton>

                    <IconButton
                      onClick={() => setPage(Math.ceil(items.length / 10))}
                      disabled={page === Math.ceil(items.length / 10)}
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
