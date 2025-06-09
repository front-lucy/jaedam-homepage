import { FC } from 'react';
import { TabButton, TabList } from './BusinessCategory.styles';

export type BusinessTabKey = 'WEBTOON' | 'PUBLISH' | 'PLATFORM' | 'IP_GLOBAL';

const tabMap: Record<BusinessTabKey, string> = {
  WEBTOON: '웹툰',
  PUBLISH: '출판&콘텐츠',
  PLATFORM: '플랫폼',
  IP_GLOBAL: 'IP&글로벌',
};

interface Props {
  activeKey: BusinessTabKey;
  onChange: (key: BusinessTabKey) => void;
}

export const BusinessCategoryTabs: FC<Props> = ({ activeKey, onChange }) => {
  return (
    <TabList>
      {Object.entries(tabMap).map(([key, label]) => (
        <TabButton
          key={key}
          isActive={activeKey === key}
          onClick={() => onChange(key as BusinessTabKey)}
        >
          {label}
        </TabButton>
      ))}
    </TabList>
  );
};
