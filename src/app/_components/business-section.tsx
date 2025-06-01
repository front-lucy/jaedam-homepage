import { Text } from "@/components/atom/text";
import styled from "@emotion/styled";

const StyledBusinessContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
`;

export const BusinessSection = () => {
  return (
    <div>
      <StyledBusinessContent>
        <Text typography="display2-bold">BUSINESS</Text>
        <Text typography="headline2-regular">
        우리는 즐거움을 만들어요.
        <br />
        당신을 미소 짓게 하기 위해
        </Text>
      </StyledBusinessContent>
    </div>
  );
};