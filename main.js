const crypto = require('crypto')

function createNestedKeyValuePairs(topLevelKey, array) {
  return array.reduce((prev, curr, idx) => {
    const pairs = Object.entries(curr).map(([k, v]) => {
      return `${topLevelKey}[${idx}].${k}=${v}`
    })
    return [...prev, ...pairs]
  }, [])
}

function createPostBodyString(postBody) {
  // see Signing Procedure > POST
  // https://help.smartling.com/hc/en-us/articles/360007829194-Callbacks-and-Webhooks

  return Object.entries(postBody)
    .reduce((prev, curr) => {
      const [key, value] = curr

      if (Array.isArray(value)) {
        const pairs = createNestedKeyValuePairs(key, value)
        return [...prev, ...pairs]
      }
      return [...prev, `${key}=${value}`]
    }, [])
    .sort()
    .join('|')
}

function digestString(string, SECRET_KEY) {
  const hmac = crypto.createHmac('SHA1', SECRET_KEY)
  hmac.update(string)
  return hmac.digest('base64')
}

/**
 * Returns a boolean indicating Smartling webhook POST body authenticity
 * @param {object} postBody - POST request body
 * @param {string} headerSignature - value of X-Smartling-Signature header
 * @param {string} SECRET_KEY - signed request secretKey
 */
module.exports.isAuthenticPostRequest = function (postBody, headerSignature, SECRET_KEY) {
  const postBodyString = createPostBodyString(postBody)
  const digest = digestString(postBodyString, SECRET_KEY)

  return headerSignature === digest
}

/**
 * Returns a boolean indicating Smartling webhook GET callback authenticity
 * @param {string} callbackUrl - callback url with query parameters
 * @param {string} headerSignature - value of X-Smartling-Signature header
 * @param {string} SECRET_KEY - signed request secretKey
 */
module.exports.isAuthenticGetRequest = function (callbackUrl, headerSignature, SECRET_KEY) {
  const digest = digestString(callbackUrl, SECRET_KEY)

  return headerSignature === digest
}