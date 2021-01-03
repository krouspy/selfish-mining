import styled from 'styled-components';

export const Content = styled.div`
  width: 65%;
  border: solid black 1px;
  padding-bottom: 50px;
`;

export const Title = styled.p`
  font-size: 1.4em;
`;

export const Text = styled.div`
  font-size: 1.2em;
`;

export const Block = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color};
  border: solid black 0.2px;
`;

export const Chain = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 30px;
`;

export const Name = styled.p`
  margin-right: 10px;
  width: 150px;
`;
