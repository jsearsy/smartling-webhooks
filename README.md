# smartling-webhooks
Library for handling Smartling webhooks

## Installation
`npm i smartling-webhooks`

## Use
`isAuthenticGetRequest()` returns a boolean indicating Smartling webhook GET callback authenticity

```javascript
/**
 * @param {object} callbackUrl - callback url with query parameters
 * @param {string} headerSignature - value of X-Smartling-Signature header
 * @param {string} SECRET_KEY - signed request secretKey
 */
```

`isAuthenticPostRequest()` returns a boolean indicating Smartling webhook POST body authenticity

```javascript
/**
 * @param {object} postBody - POST request body
 * @param {string} headerSignature - value of X-Smartling-Signature header
 * @param {string} SECRET_KEY - signed request secretKey
 */
```

 ## Documentation
 https://help.smartling.com/hc/en-us/articles/360007829194-Callbacks-and-Webhooks
