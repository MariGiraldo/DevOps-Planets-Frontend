import './Alien.css'

interface AlienProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

function Alien({ size = 'medium', className = '' }: AlienProps) {
  return (
    <div className={`alien alien-${size} ${className}`}>
      <div className="alien-head">
        <div className="alien-eye"></div>
        <div className="alien-eye"></div>
      </div>
      <div className="alien-body"></div>
    </div>
  )
}

export default Alien
