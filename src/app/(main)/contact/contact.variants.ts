export type ContactSectionItem = {
  title: string;
  description: string;
  emails: string[];
}

export const contactItems: ContactSectionItem[] = [
  {
    title: '웹툰 사업',
    description: '참신하고 매력적인 웹툰을 기다리고 있습니다.',
    emails: ['editor@jaedam.com', 'dl_940fe@jaedam.com'],
  },
  {
    title: '웹소설 사업',
    description: '참신하고 매력적인 웹소설을 기다리고 있습니다.',
    emails: ['suldam@jaedam.com'],
  },
  {
    title: '출판 사업',
    description: '출판과 관련된 문의사항은 언제든 편하게 남겨 주세요.',
    emails: ['books@jaedam.com'],
  },
  {
    title: '플랫폼 사업',
    description: '콘텐츠 이용 및 판권 관련 문의를 접수하고 있습니다.',
    emails: ['global@jaedam.com'],
  },
  {
    title: 'IP&글로벌 사업',
    description: '다양한 형태의 협업과 제휴 제안을 기다리고 있습니다.',
    emails: ['ip@jaedam.com'],
  },
];
