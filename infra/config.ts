export const config = {
    cred: {
        account: process.env.AWS_ACCOUNT_NUMBER,
        region: process.env.AWS_DEFAULT_REGION,
    },
    prefix: 'portfolio',
    deployedBy: process.env.DEPLOYED_BY || 'default',
    aws: {
        r53: {
            domainName: process.env.ADME_DOMAIN || 'adme.me',
            recordName: process.env.JIRA_TICKET_NUMBER,
            subdomainName: process.env.JIRA_TICKET_NUMBER,
        },
        s3: {
            assetsPath: '../../dist',
        },
        acm: {
            certificateArn:
                process.env.CERTIFICATE_ARN ||
                'arn:aws:acm:us-east-1:394147191967:certificate/da3001f9-ee62-411d-8a2a-feb1e197bbe1',
        },
    },
};
