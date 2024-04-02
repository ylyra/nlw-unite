import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from 'lucide-react'

const items = [
  {
    id: '7e37bc62-3c87-4443-8512-1515576655c3',
    code: '52716',
    name: 'João da Silva',
    email: 'joao@silva.com',
    registrationDate: '7 dias atrás',
    checkInDate: '3 dias atrás',
  },
  {
    id: 'd72df7c6-da5a-4479-b4a6-7c2296b3c260',
    code: '52716',
    name: 'João da Silva',
    email: 'joao@silva.com',
    registrationDate: '7 dias atrás',
    checkInDate: '3 dias atrás',
  },
]

export function AttendeeList() {
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
            />
          </div>
        </div>

        <div className="border border-white/10 rounded-lg">
          <table className="w-full ">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-sm font-semibold text-left w-12">
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border-white/10 text-orange-400 focus:ring-offset-zinc-950 focus:ring-orange-400"
                  />
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-left">
                  Código
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-left">
                  Participante
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-left">
                  Data de inscrição
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-left">
                  Data do check-in
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-left w-16" />
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm text-left text-zinc-300">
                    <input
                      type="checkbox"
                      className="size-4 bg-black/20 rounded border-white/10 text-orange-400 focus:ring-offset-zinc-950 focus:ring-orange-400"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm text-left text-zinc-300">
                    {item.code}
                  </td>
                  <td className="py-3 px-4 text-sm text-left text-zinc-300">
                    <div>
                      <span className="text-zinc-50 font-semibold block">
                        {item.name}
                      </span>
                      <span>{item.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-left text-zinc-300">
                    {item.registrationDate}
                  </td>
                  <td className="py-3 px-4 text-sm text-left text-zinc-300">
                    {item.checkInDate}
                  </td>
                  <td className="py-3 px-4 text-sm text-left text-zinc-300">
                    <button className="bg-black/20 border border-white/10 rounded-md size-7 flex items-center justify-center">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td
                  className="py-3 px-4 text-sm text-left text-zinc-300"
                  colSpan={3}
                >
                  Mostrando 10 de 228 participantes
                </td>
                <td
                  className="py-3 px-4 text-sm text-zinc-300 text-right "
                  colSpan={3}
                >
                  <div className="flex items-center justify-end gap-8">
                    <p>Página 1 de 23</p>

                    <div className="flex items-center gap-1.5">
                      <button
                        className="bg-white/20 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer enabled:hover:bg-white/30 border border-white/10 rounded-md size-7 flex items-center justify-center transition duration-200 ease-linear"
                        disabled
                      >
                        <ChevronsLeft className="size-4" />
                      </button>

                      <button
                        className="bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer enabled:hover:bg-white/30 border border-white/10 rounded-md size-7 flex items-center justify-center transition duration-200 ease-linear"
                        disabled
                      >
                        <ChevronLeft className="size-4" />
                      </button>

                      <button className="bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer enabled:hover:bg-white/30 border border-white/10 rounded-md size-7 flex items-center justify-center transition duration-200 ease-linear">
                        <ChevronRight className="size-4" />
                      </button>

                      <button className="bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer enabled:hover:bg-white/30 border border-white/10 rounded-md size-7 flex items-center justify-center transition duration-200 ease-linear">
                        <ChevronsRight className="size-4" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  )
}
