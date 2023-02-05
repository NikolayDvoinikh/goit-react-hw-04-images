import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import styles from './modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  const closeModal = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [closeModal]);

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

/* class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    const { children } = this.props;
    const { closeModal } = this;
    return createPortal(
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}
*/
export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
