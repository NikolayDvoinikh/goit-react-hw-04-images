import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { apiImages } from '../shared/services/api';
import { Dna } from 'react-loader-spinner';
import Modal from './Modal/Modal';

import styles from './app.module.scss';

export const App = () => {
  const [items, setItems] = useState([]);
  const [searchImage, setSearchImage] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);

  const onSubmitHandler = searchImg => {
    if (searchImg !== searchImage) {
      setSearchImage(searchImg);
      setItems([]);
      setPage(1);
    }
  };

  const showLargeImage = picture => {
    setLargeImage(picture);
  };

  const closeModal = () => {
    setLargeImage(null);
  };

  const nextPage = () => setPage(prevPage => prevPage + 1);

  useEffect(() => {
    if (!searchImage) {
      return;
    }
    const getImages = async () => {
      try {
        setLoading(true);
        const { hits, totalHits } = await apiImages(searchImage, page);
        setItems(prevItems => [...prevItems, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [searchImage, page]);

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={onSubmitHandler} />
      {error && <p>{error}</p>}
      {loading && (
        <Dna
          visible={true}
          height="100"
          width="300"
          ariaLabel="dna-loading"
          wrapperClass={styles.dna_wrapper}
        />
      )}
      <ImageGallery response={items} showLargeImage={showLargeImage} />
      {totalHits > items.length && <Button moreImg={nextPage} />}
      {largeImage && (
        <Modal close={closeModal}>
          <img className={styles.img} src={largeImage} alt="bigImg" />
        </Modal>
      )}
    </div>
  );
};

/* export class App extends Component {
  state = {
    items: [],
    searchImage: '',
    page: 1,
    loading: false,
    error: null,
    largeImage: null,
    totalHits: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchImage, page } = this.state;
    if (prevState.searchImage !== searchImage || prevState.page !== page) {
      this.getImages();
    }
  }

  async getImages() {
    try {
      this.setState({ loading: true });
      const { searchImage, page } = this.state;
      const { hits, totalHits } = await apiImages(searchImage, page);
      this.setState(({ items }) => ({
        items: [...items, ...hits],
        totalHits: totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  onSubmitHandler = searchImg => {
    if (searchImg !== this.state.searchImage) {
      this.setState({
        searchImage: searchImg,
        page: 1,
        items: [],
      });
    }
  };

  showLargeImage = picture => {
    this.setState({
      largeImage: picture,
    });
  };

  closeModal = () => {
    this.setState({
      largeImage: null,
    });
  };

  nextPage = () => this.setState(({ page }) => ({ page: page + 1 }));

  render() {
    const { loading, items, totalHits, largeImage } = this.state;
    const { onSubmitHandler, nextPage, closeModal, showLargeImage } = this;
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={onSubmitHandler} />
        {loading && (
          <Dna
            visible={true}
            height="100"
            width="300"
            ariaLabel="dna-loading"
            wrapperClass={styles.dna_wrapper}
          />
        )}
        <ImageGallery response={items} showLargeImage={showLargeImage} />
        {totalHits > items.length && <Button moreImg={nextPage} />}
        {largeImage && (
          <Modal close={closeModal}>
            <img className={styles.img} src={largeImage} alt="bigImg" />
          </Modal>
        )}
      </div>
    );
  }
}*/
