import React from 'react'

interface PolkaBridgeIconProps {
  size?: number
  v1?: boolean
  v2?: boolean
  v3?: boolean
}

const PolkaBridgeIcon: React.FC<PolkaBridgeIconProps> = ({ size = 36, v1, v2, v3 }) => (
  <span
    role="img"
    style={{
      fontSize: size,
      filter: v1 ? 'saturate(0.5)' : undefined,
    }}
  >
    🍣
  </span>
)

export default PolkaBridgeIcon
