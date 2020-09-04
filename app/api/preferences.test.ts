import fetchMock from 'fetch-mock';
import CommentFilterPreference from '../types/CommentFilterPreference';
import GetCategoryFiltersResponse from '../types/GetCategoryFiltersResponse';
import {
  fetchCategoryFilters,
  setCategoryFilters,
  fetchClientData,
  setClientData,
  fetchMarkedPosts,
  markPost,
} from './preferences';
import GenericSuccessResponse from '../types/GenericSuccessResponse';
import GetClientDataResponse from '../types/GetClientDataResponse';
import EmbedPreferences from '../types/EmbedPreferences';
import GetMarkedPostsResponse from '../types/GetMarkedPostsResponse';

describe('Preferences API tests', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should retrieve category filters', async () => {
    const expectedApiResponse: GetCategoryFiltersResponse = {
      filters: {
        nws: true,
        stupid: true,
        political: true,
        tangent: true,
        informative: true,
      },
    };
    const expectedResult: CommentFilterPreference[] = [
      {
        category: 'informative',
        checked: true,
      },
      {
        category: 'nws',
        checked: true,
      },
      {
        category: 'political',
        checked: true,
      },
      {
        category: 'stupid',
        checked: true,
      },
      {
        category: 'tangent',
        checked: true,
      },
    ];

    fetchMock.get(
      'https://winchatty.com/v2/clientData/getCategoryFilters?username=test',
      expectedApiResponse
    );
    const result = await fetchCategoryFilters('test');
    expect(result).toEqual(expectedResult);
  });

  it('should set new category filters', async () => {
    const expectedApiResponse: GenericSuccessResponse = {
      result: 'success',
    };
    const input: CommentFilterPreference[] = [
      {
        category: 'informative',
        checked: true,
      },
      {
        category: 'nws',
        checked: true,
      },
      {
        category: 'political',
        checked: true,
      },
      {
        category: 'stupid',
        checked: true,
      },
      {
        category: 'tangent',
        checked: true,
      },
    ];

    fetchMock.post(
      'https://winchatty.com/v2/clientData/setCategoryFilters',
      expectedApiResponse
    );
    const result = await setCategoryFilters('username', input);
    expect(result).toEqual(expectedApiResponse);
  });

  it('should retrieve client data', async () => {
    const embedPreferences: EmbedPreferences = {
      twitter: false,
      youtube: false,
      images: false,
      video: false,
    };
    const expectedApiResponse: GetClientDataResponse = {
      data: JSON.stringify(embedPreferences),
    };

    fetchMock.get(
      'https://winchatty.com/v2/clientData/getClientData?username=username&client=electric-chatty',
      expectedApiResponse
    );
    const result = await fetchClientData('username');
    expect(result).toEqual(embedPreferences);
  });

  it('should set new client data', async () => {
    const expectedApiResponse: GenericSuccessResponse = {
      result: 'success',
    };
    const input: EmbedPreferences = {
      twitter: false,
      youtube: false,
      images: false,
      video: false,
    };

    fetchMock.post(
      'https://winchatty.com/v2/clientData/setClientData',
      expectedApiResponse
    );
    const result = await setClientData('username', input);
    expect(result).toEqual(expectedApiResponse);
  });

  it('should retrieve marked posts', async () => {
    const expectedApiResponse: GetMarkedPostsResponse = {
      markedPosts: [{ id: 123456789, type: 'pinned' }],
    };

    fetchMock.get(
      'https://winchatty.com/v2/clientData/getMarkedPosts?username=username',
      expectedApiResponse
    );
    const result = await fetchMarkedPosts('username');
    expect(result).toEqual([123456789]);
  });

  it('should mark a post successfully', async () => {
    const expectedApiResponse: GenericSuccessResponse = {
      result: 'success',
    };

    fetchMock.post(
      'https://winchatty.com/v2/clientData/markPost',
      expectedApiResponse
    );
    const result = await markPost('username', 123456789, 'pinned');
    expect(result).toEqual(expectedApiResponse);
  });
});
