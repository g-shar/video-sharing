# Video-Sharing Application

This application took me approximately 2 days to complete

Day 1:
- Reading documentation
- Setting up Amplify CLI and dev environment
- Installing required libraries
- Initializing database and API
- Implementing user authentication

Day 2:
- Implementing video upload
- Creating a simple DynamoDB databaase
- Designing frontend
- Bug fixing
- Deployment

## User Authentication
User Authentication was implemented using Amazon Cognito and Amplify.

## Video Upload
Video upload was implemented using S3 Buckets and DynamoDB. When a user uploads a video, we add it into a S3 Bucket. We also add it to a DynamoDB table for videos, which contains basic info like date_posted, title, the key, and who posted it. Getting the videos from the feed gets the entries from the DynamoDB table, then gets the url from the S3 bucket using the key.

## Deployment
Deployment and the CI/CD pipeline is handled by AWS Amplify.
