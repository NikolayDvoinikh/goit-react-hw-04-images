import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './searchbar.module.scss';

class Searchbar extends Component {
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

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
