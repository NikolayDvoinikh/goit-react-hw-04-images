import PropTypes from 'prop-types';
import styles from './button.module.scss';

const Button = ({ moreImg }) => {
  return (
    <button onClick={moreImg} className={styles.button} type="button">
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  moreImg: PropTypes.func.isRequired,
};
