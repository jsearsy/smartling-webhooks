const crypto = require('crypto')

function createNestedKeyValuePairs (topLevelKey, array) {
  return array.reduce((prev, curr, idx) => {
    const pairs = Object.entries(curr).map(([k, v]) => {
      return `${topLevelKey}[${idx}].${k}=${v}`
    })
    return [...prev, ...pairs]
  }, [])
}

function createPostBodyString (postBody) {
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

function digestPostBody (postBodyString, SECRET_KEY) {
  const hmac = crypto.createHmac('SHA1', SECRET_KEY)
  hmac.update(postBodyString)
  return hmac.digest('base64')
}

/**
 * Returns a boolean indicating Smartling webhook POST body authenticity
 * @param {string} postSignature - value of X-Smartling-Signature header
 * @param {object} postBody - POST request body
 * @param {string} SECRET_KEY - signed request secretKey
 */
module.exports.isValidSignature = function (postSignature, postBody, SECRET_KEY) {
  const postBodyString = createPostBodyString(postBody)
  const digest = digestPostBody(postBodyString, SECRET_KEY)
  return postSignature === digest
}
