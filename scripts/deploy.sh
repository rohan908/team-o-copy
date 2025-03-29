#!/bin/bash

# Load environment variables from .env.aws
set -a
source .env.aws
set +a

# Build the Docker image
echo "Building Docker image..."
docker build -t softeng-app -f ./docker/Dockerfile .

# Login to AWS ECR
echo "Logging in to AWS ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Tag the image
echo "Tagging image..."
docker tag softeng-app:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest

# Push the image
echo "Pushing image to ECR..."
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest

echo "Deployment complete!"
