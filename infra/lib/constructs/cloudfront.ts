import { Construct } from 'constructs';
import {
    aws_certificatemanager as acm,
    aws_cloudfront as cloudfront,
    aws_s3 as s3,
} from 'aws-cdk-lib';

interface ICloudfrontDistributionProps {
    prefix: string;
    description: string;
    bucket: s3.IBucket;
    acmCertificate: acm.ICertificate;
    siteDomain: string;
}

/**
 * Create a new Cloudfront Distribution
 */
export class CloudFrontWebDistribution {
    public readonly distribution: cloudfront.CloudFrontWebDistribution;

    constructor(scope: Construct, props: ICloudfrontDistributionProps) {
        this.distribution = new cloudfront.CloudFrontWebDistribution(
            scope,
            `${props.prefix}-static-distribution`,
            {
                comment: props.description ?? '',
                originConfigs: [
                    {
                        s3OriginSource: {
                            s3BucketSource: props.bucket,
                        },
                        behaviors: [{ isDefaultBehavior: true }],
                    },
                ],
                errorConfigurations: [
                    {
                        errorCode: 404,
                        errorCachingMinTtl: 1,
                        responseCode: 200,
                        responsePagePath: '/index.html',
                    },
                    {
                        errorCode: 403,
                        errorCachingMinTtl: 1,
                        responseCode: 200,
                        responsePagePath: '/index.html',
                    },
                ],
                viewerCertificate:
                    cloudfront.ViewerCertificate.fromAcmCertificate(
                        props.acmCertificate,
                        {
                            aliases: [`${props.siteDomain.toLowerCase()}`],
                            securityPolicy:
                                cloudfront.SecurityPolicyProtocol.TLS_V1_2_2019,
                            sslMethod: cloudfront.SSLMethod.SNI,
                        }
                    ),
            }
        );
    }
}
