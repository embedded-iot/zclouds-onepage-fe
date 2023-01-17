import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import AddEditUserBox from 'components/Admin/AddEditUserBox';
import { ROLE_LABELS, ROUTERS } from 'components/contants';
import { AdminUsersService } from 'services';
import BoxCard from 'components/Share/BoxCard';
import { Col, Row } from 'antd';
import createUserImg from 'images/create-user-image.svg';
import arrowLeftIcon from 'images/arrow_left_icon.svg';

import './style.scss';
import Icon from 'components/Common/Icon';

function UserDetailManagementPage(props) {
  const [data, setData] = useState(null);
  const userId = parseInt(props.match.params.userId);
  const role = props.match.params.role;
  const roleLabel = !!role ? ROLE_LABELS[role] : 'User';
  const isEdit = !!userId;
  const pageTitle = isEdit ? `Edit ${roleLabel}` : `Create ${roleLabel}`;
  const pageDescription = isEdit ? `User ID: ${userId}` : 'Great job, your dashboard is ready to go! Grow your business with Fulfill.';

  const getUser = userId => {
    AdminUsersService.getUser(userId, user => {
     setData(user);
    })
  }

  useEffect(() => {
    if (isEdit) {
      getUser(userId);
    }
    // eslint-disable-next-line
  }, [userId])

  const goUsersPage = () => {
    props.push(ROUTERS.ADMIN_USERS_MANAGEMENT);
  }
  if (isEdit && !data) {
    return null;
  }

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <PageHeader
        title={pageTitle}
        description={pageDescription}
      />
      <div className="page-contents">
        <Icon src={arrowLeftIcon} width={24} height={24} className="cursor-pointer user-detail-management__back-button" onClick={props.goBack} />
        <BoxCard className="user-detail-management__box-card">
          <Row>
            <Col span={14} className="user-detail-management__form-box">
              <AddEditUserBox
                id={userId}
                isEdit={isEdit}
                data={data}
                role={role}
                redirectTo={props.push}
                onOk={goUsersPage}
                onCancel={goUsersPage}
              />
            </Col>
            <Col span={10} className="user-detail-management__right-box">
              <img src={createUserImg} alt='create user' className="user-detail-management__img"/>
            </Col>
          </Row>
        </BoxCard>
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
    goBack: () => dispatch(goBack()),
    push: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(UserDetailManagementPage);
