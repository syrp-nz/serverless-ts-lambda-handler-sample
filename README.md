# Serverless ts-lambda-handler sample project
This sample project illustrate how to use the [ts-lambda-handler](https://github.com/syrp-nz/ts-lambda-handler) to build a Serverless API using _AWS Lambda_ and _AWS API Gateway_.

# Before your start
This sample assumes you're already familiar with how to use Serverless Framework. The Serverless Framework is the world’s leading development framework for building serverless architectures.

[Learn more about the Serverless Framework](https://serverless.com)

# Getting the sample working

0. [Set up Serverless to work](https://serverless.com/framework/docs/providers/aws/guide/quick-start/) and Typescript if you don't have them already.
1. Clone this repo on your sytem: `git clone https://github.com/syrp-nz/serverless-ts-lambda-handler-sample.git`
2. Install your dependencies: `npm install`.
3. Create a `env-dev.yml` file by copying the env.sample.yml and editing the value appropriately.
4. Transpile the Typescript code to Javascript: `tsc`.
5. Test the project locally: `serverless invoke local --function HelloWorld --path events/hello-world.json`
6. Deploy your project: `serverless deploy`

After deploying the project you can test that the Function by navigating to the endpoint URL shown in the console output. (e.g.: https://SOME-RANDOM-AWS-ID.execute-api.us-west-2.amazonaws.com/dev/hello-world).

You can also invoke your function from the command line: `serverless invoke --function HelloWorld --path events/hello-world.json`

# Sample functions

## Hello World
This is the most simple function. It just spits "Hello world" in plain text in the browser on any GET request.

[View the `HelloWorld` function code](src/handlers/HelloWorld.ts)

Invoke `HelloWorld` locally with:
```bash
> serverless invoke local --function HelloWorld --path events/hello-world.json
{
    "statusCode": 200,
    "headers": {
        "content-type": "text/plain"
    },
    "body": "Hello World"
}
```

## Simple HTML Page
This function generates a simple HTML page with some dynamic content. It also provides a way to call the other functions.

Invoke `HelloWorld` locally with:
```bash
> serverless invoke local --function SimpleHtmlPage --path events/simple-html-page.json
{
    "statusCode": 200,
    "headers": {
        "content-type": "text/html"
    },
    "body": "<!doctype html>\n<html>\n    <head>\n        <meta charset=\"utf-8\">\n        <meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">\n        <title>Simple HTML Page generated with TS Lambda Handler</title>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\n        <link rel=\"stylesheet\" href=\"//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\">\n    </head>\n    <body>\n\n        <div class=\"container\">\n            <div class=\"row\">\n                <section class=\"col-xs-12 col-sm-8\">\n                    <h1>Simple HTML Page generated with TS Lambda Handler</h1>\n                    <p>This is a sample page generated by AWS API Gateway with the help of the <a href=\"https://github.com/syrp-nz/ts-lambda-handler\">TS Lambda Handler library</a>.</p>\n                </section>\n\n                <section class=\"col-xs-12 col-sm-4\">\n                    <h2>Information about your request</h2>\n                    <dl>\n                        <dt>Request ID</dt>\n                        <dd>id</dd>\n                        <dt>Function Name</dt>\n                        <dd>TestTsLambdaHandlerProject-dev-SimpleHtmlPage</dd>\n                        <dt>Function Version</dt>\n                        <dd>HEAD</dd>\n                    </dl>\n                </section>\n\n            </div>\n        </div>\n\n\n        <script src=\"https://code.jquery.com/jquery-3.2.1.min.js\" integrity=\"sha512-3P8rXCuGJdNZOnUx/03c1jOTnMn3rP63nBip5gOP2qmUh5YAdVAvFZ1E+QLZZbC1rtMrQb+mah3AfYW11RUrWA==\" crossorigin=\"anonymous\"></script>\n        <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\" integrity=\"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa\" crossorigin=\"anonymous\"></script>\n    </body>\n</html>\n"
}
```
