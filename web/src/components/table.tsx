import { ComponentPropsWithoutRef } from 'react'
import { cn } from '../lib/cn'

export function Table(props: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="border border-white/10 rounded-lg">
      <table {...props} className={cn('w-full', props.className)} />
    </div>
  )
}

export function TableHeader(props: ComponentPropsWithoutRef<'thead'>) {
  return <thead {...props} />
}

export function TableRow(props: ComponentPropsWithoutRef<'tr'>) {
  return (
    <tr
      {...props}
      className={cn('border-b border-white/10', props.className)}
    />
  )
}

export function TableHead(props: ComponentPropsWithoutRef<'th'>) {
  return (
    <th
      {...props}
      className={cn(
        'py-3 px-4 text-sm font-semibold text-left',
        props.className,
      )}
    />
  )
}

export function TableCell(props: ComponentPropsWithoutRef<'td'>) {
  return (
    <td
      {...props}
      className={cn(
        'py-3 px-4 text-sm text-left text-zinc-300',
        props.className,
      )}
    />
  )
}

export function TableFooter(props: ComponentPropsWithoutRef<'tfoot'>) {
  return <tfoot {...props} />
}
