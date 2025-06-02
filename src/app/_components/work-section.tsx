import styled from '@emotion/styled';
import { colors, TypographyType } from '@/tokens';
import { Text } from '@/components/atom/text';
import { useDeviceType } from '@/hooks/useDeviceType';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.black};
  overflow: hidden;
  position: relative;
`;

const StyledWorkContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface WorkSectionProps {
  step: number;
}

const variants: Record<
  ReturnType<typeof useDeviceType>,
  Record<
    'container',
    {
      title: TypographyType;
      description: TypographyType;
    }
  >
> = {
  desktop: {
    container: {
      title: 'display2-bold',
      description: 'headline2-regular',
    },
  },
  tablet: {
    container: {
      title: 'display2-bold',
      description: 'title1-regular',
    },
  },
  mobile: {
    container: {
      title: 'headline1-bold',
      description: 'title3-regular',
    },
  },
};

export const WorkSection = ({ step }: WorkSectionProps) => {
  const device = useDeviceType();

  return (
    <>
      {step === 0 && (
        <Container data-work-section>
          <StyledWorkContent>
            <Text
              typography={variants[device].container.title}
              color={'white'}
            >
              WORK
            </Text>
            <Text
              typography={variants[device].container.description}
              color={'white'}
              align='center'
            >
              우리는 재미를 만들고 즐거움을 확장해요.
            </Text>
          </StyledWorkContent>
        </Container>
      )}
      {step === 1 && (
        <Container data-work-section>
          <StyledWorkContent>
            <Text
              typography={variants[device].container.title}
              color={'white'}
            >
              WORK
            </Text>
            <Text
              typography={variants[device].container.description}
              color={'white'}
              align='center'
            >
              우리는 재미를 만들고 즐거움을 확장해요.
            </Text>
          </StyledWorkContent>
        </Container>
      )}
    </>
  );
};
