import { ComponentPropsWithoutRef } from 'react'
import { cn } from '../lib/cn'

type IconButtonProps = ComponentPropsWithoutRef<'button'>

export function IconButton(props: IconButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer enabled:hover:bg-white/30 border border-white/10 rounded-md size-7 flex items-center justify-center transition duration-200 ease-linear',
        props.className,
      )}
    />
  )
}
