import React from 'react';
import couponQuery from './coupon.graphql';
import Layout from '../../components/Layout';
import Coupon from './Coupon';

async function action({ params, client }) {
  const data = await client.query({
    query: couponQuery,
    variables: {
      id: params.id,
    },
  });

  return {
    title: '课程兑换券',
    component: (
      <Layout>
        <Coupon {...data} />
      </Layout>
    ),
  };
}

export default action;
