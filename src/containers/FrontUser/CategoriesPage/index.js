import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import CategoriesGrid from 'components/FrontUser/CategoriesGrid';
import InputSearch from 'components/Common/InputSearch';

import './style.scss';

function CategoriesPage(props) {
  const [searchText, setSearchText] = useState('');

  const onSearchChange = (value) => {
    setSearchText(value);
  };
  return (
    <div className="page-wrapper categories-page__wrapper">
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <div className="categories-page__search-box">
        <InputSearch
          name={"searchText"}
          placeholder="Search in Object Mockups"
          onChange={onSearchChange}
        />
      </div>
      <PageHeader
        title="Products List"
        description="Lenful is a Print-on-demand solution that helps you build a profitable online business. Start a business, with everything you need all in one place."
      />
      <div className="page-contents">
        <CategoriesGrid searchTextKey='searchText'
                        searchText={searchText}
                        redirectTo={props.push}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(CategoriesPage);
