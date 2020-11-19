# smartling-webhooks
Library for handling Smartling webhooks

## Installation
`npm i smartling-webhooks`

## Use
`isValidSignature()` validates signed POST requests

/**
 * Returns a boolean indicating Smartling webhook POST body authenticity
 * @param {string} postSignature - value of X-Smartling-Signature header
 * @param {object} postBody - POST request body
 * @param {string} SECRET_KEY - signed request secretKey
 */

 ## Documentation
 https://help.smartling.com/hc/en-us/articles/360007829194-Callbacks-and-Webhooks
