import { Construct } from 'constructs';
import {
    RemovalPolicy,
    aws_cloudfront as cloudfront,
    aws_s3 as s3,
    aws_s3_deployment as s3Deployment,
} from 'aws-cdk-lib';

interface ICfDistributionBucketProps {
    prefix: string;
}

interface IStaticWebSiteDeploymentProps {
    prefix: string;
    bucket: s3.IBucket;
    assetsPath: string;
    distribution: cloudfront.IDistribution;
    distributionPaths: string[];
}

/**
 *  Creates an S3 Bucket for static website code that has a Cloudfront Distribution
 */
export class StaticSiteBucket {
    public readonly cfBucket: s3.IBucket;

    constructor(scope: Construct, props: ICfDistributionBucketProps) {
        this.cfBucket = new s3.Bucket(
            scope,
            `${props.prefix}-cloudfront-bucket`,
            {
                bucketName: `${props.prefix}-cloudfront`.toLowerCase(),
                removalPolicy: RemovalPolicy.DESTROY,
                autoDeleteObjects: true,
                publicReadAccess: true,
                blockPublicAccess: new s3.BlockPublicAccess({
                    // blockPublicAcls: false,
                    blockPublicPolicy: false,
                    // restrictPublicBuckets: false,
                    // ignorePublicAcls: false,
                }),
                websiteIndexDocument: 'index.html',
                websiteErrorDocument: 'index.html',
                versioned: false,
            }
        );
    }
}

/**
 *  Deploys Static files into S3 bucket
 */
export class StaticWebsiteDeployment {
    constructor(scope: Construct, props: IStaticWebSiteDeploymentProps) {
        new s3Deployment.BucketDeployment(
            scope,
            `${props.prefix}-deploy-static-website`,
            {
                sources: [s3Deployment.Source.asset(props.assetsPath)],
                destinationBucket: props.bucket,
                distribution: props.distribution,
                distributionPaths: props.distributionPaths,
                memoryLimit: 2048,
            }
        );
    }
}
