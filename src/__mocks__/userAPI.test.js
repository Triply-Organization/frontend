import { axiosClient } from '../api/config/axiosClient';
import { userAPI } from '../api/userApi';

jest.mock('../api/config/axiosClient');

describe('User Api', () => {
  describe('login function', () => {
    const body = {
      email: 'customer@gmail.com',
      password: '123',
    };

    const data = { token: 'token' };

    beforeEach(() => {
      axiosClient.post.mockResolvedValue({ data });
    });

    it('should call endpoint with given email & password', async () => {
      await userAPI.login(body);
      expect(axiosClient.post).toBeCalledWith('/login', body);
    });

    it('should return response data', async () => {
      const response = await userAPI.login(body);
      expect(response.data).toStrictEqual(data);
    });
  });
});
