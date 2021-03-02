// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'owxq8waz61'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`


export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-1raa98x9.us.auth0.com',            // Auth0 domain
  clientId: 'vQwqv9OQxe9pE0WBSSI3ITQmmP6ynDCf',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
