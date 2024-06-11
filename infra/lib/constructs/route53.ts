import { Construct } from 'constructs';
import {
    aws_route53 as route53,
    aws_route53_targets as r53Targets,
    aws_cloudfront as cloudfront,
} from 'aws-cdk-lib';

interface IHostedZoneProps {
    prefix: string;
    domainName: string;
}

export class R53HostedZone {
    public readonly hostedZone: route53.IHostedZone;

    constructor(scope: Construct, props: IHostedZoneProps) {
        this.hostedZone = route53.HostedZone.fromLookup(
            scope,
            'baseHostedZone',
            {
                domainName: props.domainName,
            }
        );
    }
}

interface ICfDistributionARecordProps {
    prefix: string;
    zone: route53.IHostedZone;
    siteDomain: string;
    distribution: cloudfront.IDistribution;
}

export class R53CloudFrontDistributionARecord {
    constructor(scope: Construct, props: ICfDistributionARecordProps) {
        // Route53 alias record for the CloudFront distribution
        new route53.ARecord(scope, `${props.prefix}-cf-distribution-a-record`, {
            recordName: props.siteDomain.toLowerCase(),
            target: route53.RecordTarget.fromAlias(
                new r53Targets.CloudFrontTarget(props.distribution)
            ),
            zone: props.zone,
        });
    }
}
