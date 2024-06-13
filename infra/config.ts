export const config = {
    cred: {
        account: process.env.AWS_ACCOUNT_NUMBER,
        region: process.env.AWS_DEFAULT_REGION,
    },
    prefix: 'portfolio',
    stackName: 'portfolio',
    deployedBy: process.env.DEPLOYED_BY || 'alex.montes',
    aws: {
        r53: {
            domainName: process.env.ADME_DOMAIN || 'adme.studio',
            // recordName: process.env.JIRA_TICKET_NUMBER || 'alexmontes',
            subdomainName: process.env.PORTFOLIO_SUBDOMAIN || 'alexmontes',
        },
        s3: {
            assetsPath: '../dist',
        },
        acm: {
            certificateArn:
                process.env.CERTIFICATE_ARN ||
                'arn:aws:acm:us-east-1:068349322001:certificate/da3001f9-ee62-411d-8a2a-feb1e197bbe1',
            // 'arn:aws:acm:us-east-1:068349322001:certificate/94328012-0fee-4e7b-9d17-1a9a9b3da934',
        },
    },
};
