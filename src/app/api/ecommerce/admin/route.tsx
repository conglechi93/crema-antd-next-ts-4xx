import ecommerceData from '@crema/fakedb/ecommerce/ecommerceData';
import { NextRequest } from 'next/server';
let ecommerceListingData = ecommerceData;
export const GET = async (request: NextRequest) => {
  const { filterData = [], page = 0 }: any = Object.fromEntries(
    request.nextUrl.searchParams,
  );
  const multiPropsFilter = (
    products: any[],
    filters: any,
    stringKey = 'title',
  ) => {
    const filterKeys = Object.keys(filters);
    return products.filter((product) => {
      return filterKeys.every((key) => {
        if (filters[key].length === 0) return true;
        // Loops again if product[key] is an array (for material attribute).
        if (Array.isArray(product[key])) {
          return product[key].some((keyEle: any) =>
            filters[key].includes(keyEle),
          );
        }
        if (filters[key]?.start || filters[key]?.end) {
          if (key === 'mrp') {
            return (
              product[key] >= filters[key].start &&
              product[key] < filters[key].end
            );
          } else {
            const start = new Date(filters[key].start).getTime();
            const end = new Date(filters[key].end).getTime();
            const productDate = new Date(product[key]).getTime();

            return productDate >= start && productDate <= end;
          }
        }
        if (key === stringKey) {
          return product[key]
            .toLowerCase()
            .includes(filters[key].toLowerCase());
        }
        return filters[key].includes(product[key]);
      });
    });
  };
  try {
    // const { filterData, page } = request.params;
    const data = multiPropsFilter(ecommerceListingData, filterData);
    const index = page * 10;
    const total = data.length;
    const list = data.length > 10 ? data.slice(index, index + 10) : data;

    // const total = ecommerceData.length;
    return new Response(JSON.stringify({ list: list, total }), {
      status: 200,
    }); //TODO: change to list
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { product } = reqBody;
    ecommerceListingData = ecommerceListingData.concat({
      id: ecommerceListingData.length + 1,
      ...product,
    });
    return new Response(JSON.stringify({ data: ecommerceListingData }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { product } = reqBody;
    ecommerceListingData = ecommerceListingData.map((item) => {
      if (item.id === product.id) {
        return product;
      }
      return item;
    });
    return new Response(JSON.stringify({ data: ecommerceListingData }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
