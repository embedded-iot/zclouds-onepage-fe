import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import CategoriesGrid from 'components/FrontUser/CategoriesGrid';
import InputSearch from 'components/Common/InputSearch';

import './style.scss';
import SignUpBannerBox from 'components/FrontUser/SignUpBannerBox';

function CategoriesPage(props) {
  const { categoryId } = props.match ? props.match.params : {};
  const [searchText, setSearchText] = useState('');
  let ref = useRef({});
  const onSearchChange = (value) => {
    if (!!ref.current.searchTimeout) {
      clearTimeout(ref.current.searchTimeout);
    }
    ref.current.searchTimeout = setTimeout(() => {
      setSearchText(value);
    }, 500)
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
        description="Fulfill is a Print-on-demand solution that helps you build a profitable online business. Start a business, with everything you need all in one place."
      />
      <div className="page-contents">
        <CategoriesGrid searchTextKey='keyword'
                        searchText={searchText}
                        categoryId={categoryId}
                        redirectTo={props.push}
        />
        <SignUpBannerBox />
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
