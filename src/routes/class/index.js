import React from 'react';
import Class from './Class';
import classQuery from './class.graphql';
import Layout from '../../components/Layout';

async function action({ params, client }) {
  const data = await client.query({
    query: classQuery,
    variables: {
      id: params.class,
    },
  });

  return {
    title: '课程列表',
    component: (
      <Layout>
        <Class {...data} />
      </Layout>
    ),
  };
}

export default action;
