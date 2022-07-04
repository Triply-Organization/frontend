import { userAPI } from '../api/userApi';

const axios = require('axios');

jest.mock('axios');

it('should return token when login successfully', async () => {
  const expectToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTY5NDcwNDksImV4cCI6MTY1Njk1MDY0OSwicm9sZXMiOnsicm9sZSI6IlJPTEVfQ1VTVE9NRVIiLCIwIjoiUk9MRV9VU0VSIn0sInVzZXJuYW1lIjoiY3VzdG9tZXJAZ21haWwuY29tIn0.i4VnRR6p335gmDxWN8nBhGgIlCGz2Y8hSCb-CJvMfKezCu4lBPRXyCXBhqzRdUK1hDUDCMlkUJPTU07PUCJ_jHdqtdJu_FPn7VvT_PlRkO85zYNclJT0fdsxNTEpXOwMMmZ5VC7r2Ykn-7CuOXo5aagaM9vwx1vacXSh-JsFd-MPzHl4gWB_zyY2qo-R9k7RwTanfm609L9WNkMr-3pzRLkZ3FaNDGDQTiNc6bJrA843ZKrVraTF4z5BLbqAw6QT_MZ7izQYX675O99NSB3c8XhriJmIJykp9am8gQY8IUETRI4RJMp2dRiKOKU9DJxJE4UMmgVW56ZOF01pFQsefA';

  axios.post.mockResolvedValue({
    data: {
      status: 'success',
      data: {
        data: {
          id: 3,
          name: 'Customer',
          email: 'customer@gmail.com',
          phone: '0837885985',
          address: null,
          roles: {
            0: 'ROLE_USER',
            role: 'ROLE_CUSTOMER',
          },
        },
      },
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTY5NTAwNjcsImV4cCI6MTY1Njk1MzY2Nywicm9sZXMiOnsicm9sZSI6IlJPTEVfQ1VTVE9NRVIiLCIwIjoiUk9MRV9VU0VSIn0sInVzZXJuYW1lIjoiY3VzdG9tZXJAZ21haWwuY29tIn0.yWUWupixXBWKgAyoyFiVcZdGWBmyBvOGyr8Y4atpg4aGtKCiVKqBb9mIcl3OIXJO388BDqe5iGfwrHxsghJuC3jTOcP2Kmpi3nVwkKFCwaH714NhsI2mQsOR9NvGLR86FkEnH4_Z7Dbsduj2KDqbXPRAOD0hozXeKaHbBiFJsMB_BPCwIMWRPpNrOIW6g1QKWs-sQt0djGzV8ktp7X3YSqUwZW743iUikR5Kdz_kWWTlJlnJQXDerC-kfogDp2ZbHQ88KKUfaJNiHWUay6QeLfuf1adGhuqxxHFum8fqqmpLPImLsk6iyM-feKpS-u9kTZHnsgvJ39FSMXSZqrd4ig',
    },
  });

  const body = {
    email: 'customer@gmail.com',
    password: '123',
  };

  const response = await axios
    .post('https://api.nhivo-rentcar.me/api/', body)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  expect(response).toEqual(expectToken);
});
