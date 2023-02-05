import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleSearchName = ({ currentTarget }) => {
    setSearchName(currentTarget.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    onSubmit(searchName);
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={onSubmitHandler}>
        <button type="submit" className={styles.searchForm_button}>
          <span className={styles.searchForm_button_label}>Search</span>
        </button>

        <input
          onChange={handleSearchName}
          className={styles.searchForm_input}
          type="text"
          value={searchName}
          name="searchName"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

/* class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleSearchName = e => {
    const { value, name } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const { state, props } = this;
    props.onSubmit(state.searchName);
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.onSubmitHandler}>
          <button type="submit" className={styles.searchForm_button}>
            <span className={styles.searchForm_button_label}>Search</span>
          </button>

          <input
            onChange={this.handleSearchName}
            className={styles.searchForm_input}
            type="text"
            value={this.state.searchName}
            name="searchName"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
*/
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
