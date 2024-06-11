import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
    R53CloudFrontDistributionARecord,
    R53HostedZone,
} from './constructs/route53';
import { config } from '../config';
import { AcmCertificate } from './constructs/acm';
import { StaticSiteBucket, StaticWebsiteDeployment } from './constructs/s3';
import { CloudFrontWebDistribution } from './constructs/cloudfront';

export class InfraStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const { hostedZone } = new R53HostedZone(this, {
            prefix: config.prefix,
            domainName: config.aws.r53.domainName,
        });

        // Retrieve the certificate that allows us to use HTTPS
        const { certificate } = new AcmCertificate(this, {
            prefix: config.prefix,
            certificateArn: config.aws.acm.certificateArn,
        });

        // Create an S3 bucket for the static website
        const { cfBucket } = new StaticSiteBucket(this, {
            prefix: config.prefix,
        });

        // Create a cloudfront distribution for the new static website
        const { distribution } = new CloudFrontWebDistribution(this, {
            prefix: config.prefix,
            bucket: cfBucket,
            description: `Web distribution for the static website (420connect - ${process.env.JIRA_TICKET_NUMBER}`,
            acmCertificate: certificate,
            siteDomain: `${config.aws.r53.subdomainName}.${config.aws.r53.domainName}`,
        });

        // Deploy assets into the designated S3 bucket
        new StaticWebsiteDeployment(this, {
            prefix: config.prefix,
            bucket: cfBucket,
            assetsPath: config.aws.s3.assetsPath,
            distribution,
            // paths to invalidate cache when new objects are uploaded
            distributionPaths: ['/*'],
        });

        // Create new A Record for the Cloudfront distribution
        new R53CloudFrontDistributionARecord(this, {
            prefix: config.prefix,
            zone: hostedZone,
            siteDomain: `${config.aws.r53.subdomainName}.${config.aws.r53.domainName}`,
            distribution,
        });
    }
}
