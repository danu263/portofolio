import { Construct } from 'constructs';
import { aws_certificatemanager as acm } from 'aws-cdk-lib';

interface IAcmCertificateProps {
    prefix: string;
    certificateArn: string;
}

export class AcmCertificate {
    public readonly certificate: acm.ICertificate;

    constructor(scope: Construct, props: IAcmCertificateProps) {
        this.certificate = acm.Certificate.fromCertificateArn(
            scope,
            `${props.prefix}-acm-certificate`,
            props.certificateArn
        );
    }
}
