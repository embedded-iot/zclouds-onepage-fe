import React, { useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import ProductPagesGrid from 'components/Seller/ProductsGrid/ViewProductPagesModal/ProductPagesGrid';
import { ROUTERS } from 'components/contants';
import { FrontUserProductsService } from 'services';
import AddProductPageModal from 'components/Seller/ProductsGrid/ViewProductPagesModal/AddProductPageModal';

export default function ViewProductPagesModal({ open, data, redirectTo, onCancel }) {
  const [openAddProductPage, setOpenAddProductPage] = useState(false);
  const redirectToProductPage = (productPageId) => {
    redirectTo(ROUTERS.SELLER_PRODUCT_PAGES + '/' + productPageId);
  }

  const handleAddProductPage = () => {
    FrontUserProductsService.createProductPages(data.id, response => {
      redirectToProductPage(response.id);
    })
  };

  const handleShowAddProductPage = () => {
    setOpenAddProductPage(true);
  };

  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={`Edit Option Value`}
               onOk={handleShowAddProductPage}
               onCancel={onCancel}
               okText={'Create product Page'}
               width={1000}
    >
      <ProductPagesGrid
        redirectToProductPage={redirectToProductPage}
        data={data}
      />
      {
        openAddProductPage && (
          <AddProductPageModal
            data={data}
            open={openAddProductPage}
            onOk={handleAddProductPage}
            onCancel={() => setOpenAddProductPage(false)}
          />
        )
      }
    </ModalView>
  )
}
