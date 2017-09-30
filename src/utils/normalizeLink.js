import env from '@/env';


/**
 * Returns normalized link object.
 * @param {Object} link
 * @returns {Object}
 */
function normalizeLink(link) {
  const {
    key,
    url,
    hash,
    author = null,
    description,
    tags = [],
    clicks = {},
    updatedAt,
    createdAt,
  } = link;

  return {
    key,
    url,
    shortenUrl: `${env.serverHost}/${hash}`,
    author,
    description,
    tags,
    clicks,
    totalClicks: Object.values(clicks).reduce((total, num) => total + num, 0),
    updatedAt: new Date(updatedAt),
    createdAt: new Date(createdAt),
  };
}


export default normalizeLink;
