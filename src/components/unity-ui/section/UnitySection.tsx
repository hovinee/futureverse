interface TProps {
  children: React.ReactNode
}

const UnitySection = ({ children }: TProps) => {
  return <div className="-z-10d absolute inset-0">{children}</div>
}

export default UnitySection
