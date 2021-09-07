import { useEffect, useState } from 'react';

import styled, { keyframes } from 'styled-components';

import Card from '../UI/Card';
import { Spinner } from '../UI/Spinner';
import MealItem from './MealsItem/MealItem';

const mealAppear = keyframes`
from {
    opacity: 0;
    transform: translateY(3rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  max-width: 60rem;
  width: 90%;
  margin: 2rem auto;
  animation: ${mealAppear} 1s ease-out forwards;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const DivSpinner = styled.div`
  margin: 40px;
`;

const Error = styled.div`
  text-align: center;
  color: red;
  margin: 20px;
`;

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        'https://twitter-clone-cf72b-default-rtdb.firebaseio.com/maels.json'
      );

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await res.json();

      const loadedData = [];
      for (const key in resData) {
        loadedData.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price,
        });
      }
      setMeals(loadedData);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return <DivSpinner><Spinner /></DivSpinner>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <Section>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </Section>
  );
};

export default AvailableMeals;
