import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';
import styles from './image-gallery.module.scss';

const ImageGallery = ({ response, showLargeImage }) => {
  const elements = response.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <ImageGalleryItem
        key={id}
        largeImg={largeImageURL}
        url={webformatURL}
        imgClick={showLargeImage}
      />
    );
  });

  return <ul className={styles.imageGallery}>{elements}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  response: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  showLargeImage: PropTypes.func.isRequired,
};
