import { Fragment, memo } from 'react';

export interface SwitchCaseProps {
  value: string;
  cases: {
    [key: string]: React.ReactNode;
  };
  defaultCase?: React.ReactNode;
}

export const SwitchCase = memo(({ value, cases, defaultCase }: SwitchCaseProps) => {
  const caseKeys = Object.keys(cases);

  return (
    <div>
      {caseKeys.map(key => (
        <Fragment key={key}>{key === value && cases[key]}</Fragment>
      ))}
      {defaultCase && !caseKeys.includes(value) && <Fragment>{defaultCase}</Fragment>}
    </div>
  );
});

SwitchCase.displayName = 'SwitchCase';
