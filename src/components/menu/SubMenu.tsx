import clsx from 'clsx'
import Anchor from '../ui/anchor/Anchor'
import CSText from '../ui/text/CSText'

interface MenuItem {
  path: string
  title: string
}

interface TProps {
  menu: MenuItem[]
  className?: string
  onFocus?: () => void
  [key: string]: any
}

const Submenu = ({ menu, className, onFocus, ...rest }: TProps) => {
  return (
    <ul
      className={clsx(
        'duration-400 visible absolute left-0 top-full z-20 w-[11.4rem] bg-[#00A886] px-[2.3rem] py-[1.5rem] opacity-0 transition-all ',
        className,
      )}
      {...rest}
    >
      {menu.map((value, index) => (
        <li key={index} className="relative">
          <Anchor
            className="text-secondary flex items-center py-[0.5rem]"
            path={value.path}
          >
            <CSText size="12" color="white">
              {value.title}
            </CSText>
          </Anchor>
        </li>
      ))}
    </ul>
  )
}

export default Submenu
