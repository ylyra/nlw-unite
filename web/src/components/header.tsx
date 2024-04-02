import nlwUniteIcon from '../assets/nlw-unite-icon.svg'

const menus = [
  {
    id: 'ea292f17-ef8e-4974-9b3d-c18bba5aca3c',
    href: '',
    label: 'Eventos',
  },
  {
    id: 'a17c3257-99a3-4c4a-b7bb-242bcb1ea75e',
    href: '',
    label: 'Participantes',
  },
]

export function Header() {
  return (
    <header>
      <div className="container  flex items-center gap-5">
        <img src={nlwUniteIcon} alt="" />

        <nav>
          <ul className="flex items-center gap-5">
            {menus.map((item) => (
              <li key={item.id}>
                <a
                  className="text-sm font-medium text-zinc-300 data-[state=active]:text-zinc-50 hover:text-zinc-100 transition-colors duration-200 ease-linear"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
