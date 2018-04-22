import React from 'react';
import Lesson from './Lesson';
import Layout from '../../components/Layout';

async function action({ params, fetch }) {
  const [resp, clz] = await Promise.all([
    fetch('/graphql', {
      body: JSON.stringify({
        query: `{
            lesson(id: "${params.id}") {
              id
              image
              title
              description
              video
              validatedIn
            }
          }`,
      }),
    }),
    fetch('/graphql', {
      body: JSON.stringify({
        query: `{
            class(id: "${params.class}") {
              id
              paid
              beginAt
              teacher
              price
            }
          }`,
      }),
    }),
  ]);

  const classData = await clz.json();
  const { data } = await resp.json();

  return {
    title: data.lesson.title,
    component: (
      <Layout>
        <Lesson beginAt={classData.data.class.beginAt} lesson={data.lesson} />
      </Layout>
    ),
  };
}

export default action;
