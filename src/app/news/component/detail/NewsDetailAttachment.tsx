"use client";

import Download from "@/assets/icons/Icon-download-square-fill.svg";
 
 
import { downloadImage } from "@/utils/downloadFile";
import * as S from "./NewsDetail.styles";
import { NewsAttachment } from "./NewsDetail.type";
 

type Props = {
  attachments: NewsAttachment[];
};

export const NewsDetailAttachment = ({ attachments }: Props) => {
  if (!attachments || attachments.length === 0) return null;

 
 
  return (
    <S.AttachmentSection>
      <S.AttachmentTitle>첨부파일</S.AttachmentTitle>
      <S.AttachmentList>
        {attachments.map((file, index) => (
          <S.AttachmentItem key={index}>
 
            <div onClick={() => 
                downloadImage(file.url, file.originalName)
            }> 

              <Download />
      {file.originalName}  {/*  ({formatFileSize(file.size)}) */}
            </div>
          </S.AttachmentItem>
        ))}
      </S.AttachmentList>
    </S.AttachmentSection>
  );
};
