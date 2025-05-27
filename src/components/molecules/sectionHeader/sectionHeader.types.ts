export interface SectionHeaderProps {
  title: string;
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}
