# smartling-webhooks
![npm bundle size (version)](https://img.shields.io/bundlephobia/min/smartling-webhooks/2.0.1)
![npm](https://img.shields.io/npm/dt/smartling-webhooks)
![npm](https://img.shields.io/npm/l/smartling-webhooks)

Library for handling Smartling webhooks

## Installation
`npm i smartling-webhooks`

## Use
`isAuthenticGetRequest()` returns a boolean indicating Smartling webhook GET callback authenticity

```javascript
/**
 * @param {string} callbackUrl - callback url with query parameters
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
