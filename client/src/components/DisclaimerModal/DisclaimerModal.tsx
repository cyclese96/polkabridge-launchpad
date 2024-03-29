import React, { useCallback, useState, useMemo } from 'react'

import MaterialButton from '../Button/MaterialButton'
import CardIcon from '../CardIcon'
import Modal, { ModalProps } from '..//Modal'
import ModalActions from '..//ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'

interface DisclaimerModal extends ModalProps {
  onConfirm: () => void
}

const DisclaimerModal: React.FC<DisclaimerModal> = ({
  onConfirm,
  onDismiss,
}) => {
  const [step, setStep] = useState('disclaimer')

  const handleConfirm = useCallback(() => {
    onConfirm()
    // onDismiss()
  }, [onConfirm, onDismiss])

  const modalContent = useMemo(() => {
    if (step === 'disclaimer') {
      return (
        <div>
          <p>Audits: None.</p>
          <p>
            While the initial creators of the PBR protocol have made reasonable
            efforts to attempt to ensure the security of the contracts,
            including forking much of the codebase from existing well-audited
            projects and soliciting review from friends, nothing approaching the
            rigor of a formal audit has been conducted at this time.
          </p>
          <p>
            We STRONGLY urge caution to anyone who chooses to engage with these
            contracts.
          </p>
        </div>
      )
    } else {
      return <div></div>
    }
  }, [step])

  const button = useMemo(() => {
    if (step === 'disclaimer') {
      return (
        <MaterialButton variant="secondary" onClick={() => setStep('uniswap')}>
          Next
        </MaterialButton>
      )
    } else {
      return (
        <MaterialButton onClick={handleConfirm}>I understand</MaterialButton>
      )
    }
  }, [setStep, step, handleConfirm])

  return (
    <Modal>
      <ModalTitle text={`Warning`} />
      <CardIcon>⚠️</CardIcon>
      <ModalContent>{modalContent}</ModalContent>
      <ModalActions>{button}</ModalActions>
    </Modal>
  )
}

export default DisclaimerModal
