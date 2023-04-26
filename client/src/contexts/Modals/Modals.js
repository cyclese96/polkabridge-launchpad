import React, { createContext, useCallback, useState } from 'react'
import styled from 'styled-components'

// interface ModalsContext {
//   content?: React.ReactNode
//   isOpen?: boolean
//   onPresent: (content: React.ReactNode, key?: string) => void
//   onDismiss: () => void
// }

export const Context = createContext({
  onPresent: () => {},
  onDismiss: () => {},
})

const Modals = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState()
  const [modalKey, setModalKey] = useState()

  const handlePresent = useCallback(
    (modalContent, key) => {
      setModalKey(key)
      setContent(modalContent)
      setIsOpen(true)
    },
    [setContent, setIsOpen, setModalKey],
  )

  const handleDismiss = useCallback(() => {
    setContent(undefined)
    setIsOpen(false)
  }, [setContent, setIsOpen, modalKey])

  return (
    <Context.Provider
      value={{
        content,
        isOpen,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      {children}
      {isOpen && (
        <StyledModalWrapper>
          <StyledModalBackdrop onClick={handleDismiss} />
          {React.isValidElement(content) &&
            React.cloneElement(content, {
              onDismiss: handleDismiss,
            })}
        </StyledModalWrapper>
      )}
    </Context.Provider>
  )
}

const StyledModalWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  z-index: 90;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const StyledModalBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export default Modals
