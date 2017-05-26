import * as LambdaHandler from 'ts-lambda-handler';
import * as JWT from 'jsonwebtoken';

/**
 * AWS Lambda stores environement variables, including Lambda function variables, in the `process` object. If you want
 * to access those variables, you need to declare the process object otherwise TypeScript will not know about and you'll
 * get an error when transpiling your code.
 */
declare const process: any;

/**
 * This function demonstrate how to secure an API endpoint against unauthorized access. It reads a JWT from a cookie.
 *
 * If the JWT is valid, then it returns its payload. Otherwise it returns a 401 error.
 */
class AboutMeHandler extends LambdaHandler.Handlers.AbstractHandler {
    public process(request: LambdaHandler.Request, response: LambdaHandler.Response): Promise<void> {
        response
            .setBody(this.user)
            .setStatusCode(200)
            .addHeader('content-type', 'application-json')
            .send();
        return Promise.resolve();

    }
}

/**
 * Handlers can delegate the authentification logic to an Authorizer class. The core library already provides an
 * authorizer for validating JWT tokens. However that class expects the token to be provided in the Authorization
 * header.
 *
 * Our JWT will be returned via a cookie, so we alter the default behavior.
 * @param  {LambdaHandler.Request} request [description]
 * @return {Promise<string>}               [description]
 */
class CookieJwtAuthorizer extends  LambdaHandler.Authorizers.JWTAuthorizer {

    /**
     * Instead of reading the JWT for the authorization header, let's read it from the cookie header.
     * @param  {LambdaHandler.Request} request [description]
     * @return {Promise<string>}               [description]
     */
    protected getJwtSignature(request: LambdaHandler.Request): Promise<string> {
        return Promise.resolve(request.getCookie('jwt'));
    }
}

/**
 * When instanciating an handler you can provide various configuration options. In this case we provide an authorizer
 * that will determine for the handler if the request came from an authorized user.
 */
const handlerConfig: LambdaHandler.Config.HandlerConfig = {
    // Our authorizer needs a secret to valide the JWT. This secret is originally set in the `serverless.yml` file and
    // is access via the envrironement variables.
    authorizer: new CookieJwtAuthorizer(process.env.SECRET)
}

export let handler = new AboutMeHandler(handlerConfig).handle;
