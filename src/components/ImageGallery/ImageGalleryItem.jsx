import PropTypes from 'prop-types';

import styles from './image-gallery-item.module.scss';

const ImageGalleryItem = ({ url, largeImg, imgClick }) => {
  return (
    <li className={styles.imageGalleryItem} onClick={() => imgClick(largeImg)}>
      <img
        className={styles.imageGalleryItem_image}
        src={url}
        alt="description img"
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  imgClick: PropTypes.func.isRequired,
};
