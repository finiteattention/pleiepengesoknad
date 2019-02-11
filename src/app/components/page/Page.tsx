import * as React from 'react';
import DocumentTitle from 'react-document-title';
import InformationMessage from '../information-message/InformationMessage';
import './page.less';

interface PageProps {
    className?: string;
    title: string;
    topContentRenderer?: () => React.ReactElement<any>;
}

const Page: React.FunctionComponent<PageProps> = ({ className, title, children, topContentRenderer }) => (
    <DocumentTitle title={title}>
        <>
            <InformationMessage message="Denne siden er under utvikling" />
            {topContentRenderer && topContentRenderer()}
            <div className={`page ${className}`}>{children}</div>
        </>
    </DocumentTitle>
);

export default Page;
