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

# Available functions

## [Hello World](serverless-ts-lambda-handler-sample/tree/master/src/handlers)
This is the most simple function. It just spits "Hello world" in plain text in the browser on any GET request.
