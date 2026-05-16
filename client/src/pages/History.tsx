import React from "react";
import styled from "styled-components";
import ProgressHeader from "../widgets/History/ProgressHeader";
import Timeline from "../widgets/History/Timeline";

const Container = styled.main`
  padding: 80px 16px 120px;
  max-width: 1200px;
  margin: 0 auto;
`;

const HistoryPage: React.FC = () => {
  return (
    <>
      <Container>
        <ProgressHeader />
        <Timeline />
      </Container>
    </>
  );
};

export default HistoryPage;
