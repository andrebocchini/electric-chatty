import formurlencoded from 'form-urlencoded';
import CommentFilterPreference from '../types/CommentFilterPreference';
import { defaultHeaders, handleRequestErrors, handleApiErrors } from './common';
import GetCategoryFiltersResponse from '../types/GetCategoryFiltersResponse';
import GenericSuccessResponse from '../types/GenericSuccessResponse';
import EmbedPreferences from '../types/EmbedPreferences';
import GetClientDataResponse from '../types/GetClientDataResponse';
import GetMarkedPostsResponse from '../types/GetMarkedPostsResponse';

const CLIENT_NAME = 'electric-chatty';

export function fetchCategoryFilters(
  username: string
): Promise<CommentFilterPreference[]> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://winchatty.com/v2/clientData/getCategoryFilters?username=${username}`,
      defaultHeaders
    )
      .then(handleRequestErrors)
      .then((response) => handleApiErrors<GetCategoryFiltersResponse>(response))
      .then((response: GetCategoryFiltersResponse) => {
        const filters: CommentFilterPreference[] = [];
        Object.keys(response.filters).forEach((category) => {
          filters.push({
            category,
            checked: response.filters[category],
          });
        }, filters);

        return resolve(
          filters.sort((a, b) => a.category.localeCompare(b.category))
        );
      })
      .catch((error) => reject(error));
  });
}

export function setCategoryFilters(
  username: string,
  categoryFilters: CommentFilterPreference[]
): Promise<GenericSuccessResponse> {
  return new Promise((resolve, reject) => {
    const filters: Record<string, boolean> = {};
    categoryFilters.forEach((filter) => {
      filters[filter.category] = filter.checked;
    });
    const requestBody = formurlencoded({
      username,
      ...filters,
    });

    fetch('https://winchatty.com/v2/clientData/setCategoryFilters', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    })
      .then(handleRequestErrors)
      .then((response) => handleApiErrors<GenericSuccessResponse>(response))
      .then((response: GenericSuccessResponse) => resolve(response))
      .catch((error) => reject(error));
  });
}

export function fetchClientData(username: string): Promise<EmbedPreferences> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://winchatty.com/v2/clientData/getClientData?username=${username}&client=${CLIENT_NAME}`,
      defaultHeaders
    )
      .then(handleRequestErrors)
      .then((response) => handleApiErrors<GetClientDataResponse>(response))
      .then((response: GetClientDataResponse) => {
        try {
          const embedPreferences: EmbedPreferences = JSON.parse(response.data);
          return resolve(embedPreferences);
        } catch (error) {
          return resolve({});
        }
      })
      .catch((error) => reject(error));
  });
}

export function setClientData(
  username: string,
  embedPreferences: EmbedPreferences
): Promise<GenericSuccessResponse> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(embedPreferences);
    const requestBody = formurlencoded({
      username,
      client: CLIENT_NAME,
      data,
    });

    fetch('https://winchatty.com/v2/clientData/setClientData', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    })
      .then(handleRequestErrors)
      .then((response) => handleApiErrors<GenericSuccessResponse>(response))
      .then((response: GenericSuccessResponse) => resolve(response))
      .catch((error) => reject(error));
  });
}

export function fetchMarkedPosts(username: string): Promise<number[]> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://winchatty.com/v2/clientData/getMarkedPosts?username=${username}`,
      defaultHeaders
    )
      .then(handleRequestErrors)
      .then((response) => handleApiErrors<GetMarkedPostsResponse>(response))
      .then((response: GetMarkedPostsResponse) => {
        const markedPosts: number[] = [];
        response.markedPosts.forEach((markedPost) => {
          if (markedPost.type === 'pinned') {
            markedPosts.push(markedPost.id);
          }
        }, markedPosts);
        return resolve(markedPosts);
      })
      .catch((error) => reject(error));
  });
}

export function markPost(
  username: string,
  postId: number,
  type: string
): Promise<GenericSuccessResponse> {
  return new Promise((resolve, reject) => {
    const requestBody = formurlencoded({
      username,
      postId,
      type,
    });

    fetch('https://winchatty.com/v2/clientData/markPost', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    })
      .then(handleRequestErrors)
      .then((response) => handleApiErrors<GenericSuccessResponse>(response))
      .then((response: GenericSuccessResponse) => resolve(response))
      .catch((error) => reject(error));
  });
}
