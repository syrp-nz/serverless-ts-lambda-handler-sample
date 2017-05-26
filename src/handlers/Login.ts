import * as LambdaHandler from 'ts-lambda-handler';
import * as JWT from 'jsonwebtoken';

const secret = 'my_super_evil_secret';

/**
 * This function demonstrate a very simple authorization process. It expect to receive a JSON object with a `username`
 * and `password` attribute. If the `username` and the `password` match, then the user is issued a Json Web Token (JWT)
 * to be stored in a cookie.
 */
class LoginHandler extends LambdaHandler.Handlers.AbstractHandler {
    public process(request: LambdaHandler.Request, response: LambdaHandler.Response): Promise<void> {
        const data = this.request.getBodyAsJSON();

        return this.validate(data).then(() => {
            // Build a jwt for the current user
            const jwt = this.signJwt(data.username);

            // For simplicity, we'll store the JWT althought.

            const cookieOptions: LambdaHandler.CookieOptions = {
                maxAge: 4 * 60,     // We'll set the cookie expiration date to be 4 min (2 min more than the JWT).
                httpOnly: false,
            };

            response
                // For simplicity, store the JWT in a cookie. They are better ways of doing this
                .addCookie('jwt', jwt , cookieOptions)
                .setStatusCode(204)
                .send();
            return Promise.resolve();
        })

    }

    protected validate(data: any): Promise<void> {
        if (data && data.user && data.password) {
            if (data.user == data.password) {
                // We have a valid user.
                return Promise.resolve();
            } else {
                // If the parameters are there, but don't match return a 401 error
                return Promise.reject(new LambdaHandler.Errors.UnauthorizedError());
            }
        } else {
            // If we are missing a parameter return a 400 error
            return Promise.reject(new LambdaHandler.Errors.BadRequestError());
        }
    }

    /**
     * Create a JSON web token that is valid for 5 min. If you wanted to you could just issue a session ID or perform some other type of authorization.
     */
    protected signJwt(username:string): string {
        // Build a payload
        const payload = {
            username: username
        };

        // Our token will be valid for 2 minutes
        const options = {expiresIn: 2 * 60};

        // Build the actual token
        return JWT.sign(payload, secret, options)
    }
}

export let handler = new LoginHandler().handle;
