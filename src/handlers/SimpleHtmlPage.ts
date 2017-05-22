import * as LambdaHandler from 'ts-lambda-handler';

/**
 * Generates a simplage HTML Page with some Dynamic content.
 */
class SimpleHtmlPageHandler extends LambdaHandler.Handlers.AbstractHandler {
    public process(request: LambdaHandler.Request, response: LambdaHandler.Response): Promise<void> {

        // We start by initialising our HTML Template object
        const template = new LambdaHandler.Utilities.HtmlTemplate();

        return template
            // Let's specify a tempalte file. The template uses the Mustache JS rendering engine
            .setTemplate('assets/SimpleHtmlPageHandler.mustache')

            // We inject basic information about the request in our template. It will be displayed in a Definition List.
            .inject('requestInfo', [
                {dt: 'Request ID', dd: this.context.awsRequestId},
                {dt: 'Function Name', dd: this.context.functionName},
                {dt: 'Function Version', dd: this.context.functionVersion},
            ])

            // We render the template. This will return a promise that will resolve to a string containing
            // our rendered HTML
            .render().then((html: string) => {

                // We set the body of our response to the HTML string and send the response to the client.
                response.setBody(html).addHeader('content-type', 'text/html').send();
                return Promise.resolve();
            });
    }
}

export let handler = new SimpleHtmlPageHandler().handle;
