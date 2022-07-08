import { axiosClient } from '../api/config/axiosClient';
import { tourAPI } from '../api/tourAPI';

jest.mock('../api/config/axiosClient');

describe('Tour Api', () => {
  describe('getDestinationsServiceTours function ', () => {
    const data = {
      tours: [],
      destination: [],
      service: [],
    };

    beforeEach(() => {
      axiosClient.get.mockResolvedValue({ data });
    });

    it('should call endpoint', async () => {
      await tourAPI.getDestinationsServiceTours();
      expect(axiosClient.get).toBeCalledWith('/tours');
    });

    it('should return response data', async () => {
      const response = await tourAPI.getDestinationsServiceTours();
      expect(response.data).toStrictEqual(data);
    });
  });
  describe('getTourById function ', () => {
    const body = 1;

    const data = {
      data: {},
    };

    beforeEach(() => {
      axiosClient.get.mockResolvedValue({ data });
    });

    it('should call endpoint with id tour', async () => {
      await tourAPI.getTourById(body);
      expect(axiosClient.get).toBeCalledWith(`/tours/${body}`);
    });

    it('should return response data', async () => {
      const response = await tourAPI.getTourById(body);
      expect(response.data).toStrictEqual(data);
    });
  });

  describe('getToursByFilter function ', () => {
    const bodyURI = '?guests[]=1&guests[]=2&orderBy=asc&page=1';

    const data = {
      data: {},
    };

    beforeEach(() => {
      axiosClient.get.mockResolvedValue({ data });
    });

    it('should call endpoint with query string be decoded URI', async () => {
      await tourAPI.getToursByFilter(bodyURI);
      expect(axiosClient.get).toBeCalledWith(`/tours${bodyURI}`);
    });

    it('should return response data', async () => {
      const response = await tourAPI.getToursByFilter(bodyURI);
      expect(response.data).toStrictEqual(data);
    });
  });
});
