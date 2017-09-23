import React from 'react';
import { Card as BaseCard, Text, Button } from 'react-native-elements';
import { primaryColor } from '../utils/colors';

function Card({ question, order }) {
  return (
    <BaseCard key={question.statement + order} title={`Question ${order}`}>
      <Text style={{ marginBottom: 20 }}>
        {question.statement}
      </Text>
      <Button
        icon={{ name: 'lightbulb', type: 'foundation' }}
        backgroundColor={primaryColor}
        title="Answer"
      />
    </BaseCard>
  );
}
export default Card;
