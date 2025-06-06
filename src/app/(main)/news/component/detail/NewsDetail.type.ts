
export type NewsDetailTitleSectionProps = {
    category: "SNS" | "JAEDAM_NOTICE" | "PRESS_RELEASE" | "MEDIA_CONTENT" 
    title: string;
    noticedAt: string;
  };
  
  export type NewsDetailProps = {
    id: number;
    title: string;
    category: "SNS" | "JAEDAM_NOTICE" | "PRESS_RELEASE" | "MEDIA_CONTENT" | "LINK_RESOURCE";
    noticedAt: string; // ISO string or formatted date
    content: string; // HTML or Markdown string
    important?: boolean;
    fileList?: NewsAttachment[];
  };

  export type NewsAttachment = { 
    url: string;
    originalName: string; // 예: "563.4K"
  };
  