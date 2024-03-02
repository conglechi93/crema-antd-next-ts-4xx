'use client';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import AppLoader from '@crema/components/AppLoader';
import AppAnimate from '@crema/components/AppAnimate';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { isEmptyObject } from '@crema/helpers/ApiHelper';
import AddEditProduct from '../AddEditProduct';
import { ProductDataType } from '@crema/types/models/ecommerce/EcommerceApp';

const ProductEditPage = () => {
  const params = useParams();
  const [{ apiData: currentProduct, loading }, { setQueryParams }] =
    useGetDataApi<ProductDataType>('ecommerce', undefined, {}, false);

  useEffect(() => {
    setQueryParams({ id: params.all?.[0] });
  }, [params.all?.[0]]);

  return loading || isEmptyObject(currentProduct) ? (
    <AppLoader />
  ) : (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <AddEditProduct selectedProd={currentProduct} />
    </AppAnimate>
  );
};
export default ProductEditPage;
