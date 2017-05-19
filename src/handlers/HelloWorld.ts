import * as LambdaHandler from 'ts-lambda-handler';

class HelloWorld extends LambdaHandler.Handlers.AbstractHandler {
    public process(request: LambdaHandler.Request, response: LambdaHandler.Response): Promise<void> {
        response
            .setBody('Hello World')
            .addHeader('content-type', 'text/plain')
            .send();
        return Promise.resolve();
    }
}

export let handler = new HelloWorld().handle;
