import { cartItems } from '@crema/fakedb/ecommerce/ecommerceData';
import { NextRequest } from 'next/server';

let cartItemsData = cartItems;
export const GET = async () => {
  try {
    return new Response(JSON.stringify(cartItemsData), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const POST = async (request: NextRequest) => {
  const reqBody = await request.json();
  try {
    const { product } = reqBody;
    if (cartItemsData.some((item) => +item.id === +product.id)) {
      cartItemsData = cartItemsData.map((item) => {
        if (+item.id === +product.id) {
          item.count = +item.count + 1;
        }
        return item;
      });
      return new Response(JSON.stringify(cartItemsData), {
        status: 200,
      });
    } else {
      cartItemsData = cartItemsData.concat({
        id: product.id,
        product: {
          image: product.image[0].src,
          title: product.title,
          brand: product.brand,
        },
        price: {
          mrp: product.mrp,
          discount: product.discount,
        },
        total: {
          mrp: product.mrp,
          discount: product.discount,
          count: 1,
        },
        count: 1,
      });
      return new Response(JSON.stringify(cartItemsData), {
        status: 200,
      });
    }
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { product } = reqBody;
    cartItemsData = cartItemsData.map((item) =>
      item.id === product.id ? product : item,
    );
    return new Response(JSON.stringify(cartItemsData), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
