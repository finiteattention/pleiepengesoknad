import * as React from 'react';
import UnstyledList from '../unstyled-list/UnstyledList';
import AttachmentListElement from '../attachment-list-element/AttachmentListElement';

interface AttachmentListProps {
    attachments: Attachment[];
    onRemoveAttachmentClick: (attachment: Attachment, e: React.SyntheticEvent) => void;
    deleteButtonAriaLabel: string;
}

const AttachmentList: React.FunctionComponent<AttachmentListProps> = ({ attachments, ...otherProps }) => (
    <UnstyledList>
        {attachments.map((attachment, index) => (
            <AttachmentListElement attachment={attachment} key={attachment.file.name + index} {...otherProps} />
        ))}
    </UnstyledList>
);

export default AttachmentList;