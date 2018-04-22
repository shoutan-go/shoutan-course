import React from 'react';
import Classes from './Classes';
import classesQuery from './classes.graphql';
import Layout from '../../components/Layout';

async function action({ client }) {
  const data = await client.query({
    query: classesQuery,
  });

  return {
    title: '开班列表',
    component: (
      <Layout>
        <Classes {...data} />
      </Layout>
    ),
  };
}

export default action;
