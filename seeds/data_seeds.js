const faker = require('faker');

module.exports.seed = async db => {
  const courses = Array.from({ length: 10 }).map(() => ({
    id: faker.random.uuid(),
    image: 'http://www.material-ui.com/images/nature-600-337.jpg',
    title: faker.lorem.sentence(),
    description: faker.lorem.text(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const classes = courses.map(course => ({
    id: faker.random.uuid(),
    teacher: faker.internet.avatar(),
    course: course.id,
    beginAt: faker.date.future(),
    price: faker.random.number(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const lessons = [].concat(
    ...courses.map(course =>
      Array.from({ length: 10 }).map(() => ({
        id: faker.random.uuid(),
        course: course.id,
        image: 'http://chuantu.biz/t6/283/1523613921x-1404764870.jpg',
        title: faker.lorem.sentence(),
        description: faker.lorem.text(),
        video:
          'http://182.254.17.40/vhot2.qqvideo.tc.qq.com/AI5gID9CVYbmc6YcBPIZGaAokzWhA0vjrSMz3aa-x67I/w06284v3v5s.mp4?sha=A48D323DF676CA6C052B986897E3113EA5DB0AD8&sdtfrom=v1010&guid=bdf0be88edf328341c9eb630e233acbf&vkey=5A25D8579D1695423F565FA2764FF69581F14A111E4E747BF14FEC58919C65F62E1375601AD71166675D05D8DB5A7559F6B1FD114364E35337D749993D1087B29A70DEE9D902744BCB58DCD0F23A3F9D263409DF2D6C2359DD3BFA0B400921431C3E60682CE3AD443B764A2EB9B86E7CEBE56C365A48BE82&ocid=2606568876&ocid=2236749228&ocid=3834934628',
        validatedIn: faker.random.number({
          min: 1,
          max: 100,
        }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
    ),
  );

  const coupons = [].concat(
    ...classes.map(clz =>
      Array.from({ length: 10 }).map(() => ({
        id: faker.random.uuid(),
        class: clz.id,
        used: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
    ),
  );

  await Promise.all(courses.map(c => db.table('Course').insert(c)));
  await Promise.all(classes.map(c => db.table('Class').insert(c)));
  await Promise.all(lessons.map(c => db.table('Lesson').insert(c)));
  await Promise.all(coupons.map(c => db.table('Coupon').insert(c)));
};
