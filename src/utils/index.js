import { split, nth, assign, isEmpty } from 'lodash'
import { parse, stringify } from 'qs'

export const getUrlQuery = url => {
  const queryParams = nth(split(url, '?'), 1)
  return parse(queryParams)
}

export const mergeQuery = (url, query = {}) => {
  const [baseUrl, queryParams] = split(url, '?')
  if (isEmpty(queryParams) && isEmpty(query)) return baseUrl
  return `${baseUrl}${stringify(assign(parse(queryParams), query))}`
}

// 没有qs的话如下
// import { split, head, join, findIndex } from 'lodash';
// export const getOtherQuery = query =>
//   reduce(
//     keys(query),
//     (acc, cur) => {
//       if (cur !== 'redirect') {
//         acc[cur] = query[cur];
//       }
//       return acc;
//     },
//     {}
//   );

// export const mergeQuery = (url, query) => {
//   const [baseUrl, queryParams] = split(url, '?');
//   let queryParamsList = [];
//   if (queryParams) {
//     queryParamsList = split(queryParams, '&');
//   }
//   forIn(query, (value, key) => {
//     const newParams = `${key}=${value}`;
//     const index = findIndex(queryParamsList, param => head(split(param, '=')) === key);
//     if (index > -1) {
//       queryParamsList[index] = newParams;
//     } else {
//       queryParamsList.push(newParams);
//     }
//   });
//   if (!queryParamsList.length) return baseUrl;
//   return `${baseUrl}?=${join(queryParamsList, '&')}`;
// };
