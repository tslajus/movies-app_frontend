import styles from './Modal.module.css';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
};

function Modal({ isOpen, setIsOpen, children }: ModalProps) {
  return (
    <>
      <div className={isOpen ? styles.background : ''} onClick={() => setIsOpen(false)} />
      {isOpen && <div className={styles.box}>{children}</div>}
    </>
  );
}

export default Modal;
