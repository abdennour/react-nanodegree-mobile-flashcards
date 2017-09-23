import React from 'react';
import { Card as BaseCard, Text, Button } from 'react-native-elements';

function Card({ question, order }) {
  return (
    <BaseCard key={question.statement + order} title={`Question ${order}`}>
      <Text style={{ marginBottom: 10 }}>
        {question.statement}
      </Text>
      <Button
        icon={{ name: 'lightbulb-on-outline', type: 'material-community' }}
        backgroundColor="#8dc63f"
        title="Answer"
      />
    </BaseCard>
  );
}
export default Card;
