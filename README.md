# Video-Sharing Application

## User Authentication
User Authentication was implemented using Amazon Cognito and Amplify.

## Video Upload
Video upload was implemented using S3 Buckets and DynamoDB. When a user uploads a video, we add it into a S3 Bucket. We also add it to a DynamoDB table for videos, which contains basic info like date_posted, title, the key, and who posted it. Getting the videos from the feed gets the entries from the DynamoDB table, then gets the url from the S3 bucket using the key.

## Deployment
Deployment and the CI/CD pipeline is handled by AWS Amplify.
