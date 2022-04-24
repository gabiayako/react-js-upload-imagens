import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { string } from 'yup';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [imageUrl, setImageUrl] = useState('');

  const handleViewImage = (url: string): void => {
    onOpen();
    setImageUrl(url);
  };

  return (
    <>
      <SimpleGrid column={3} spacing="40px">
        {(cards || []).map(card => (
          <Card data={card} viewImage={handleViewImage} />
        ))}
      </SimpleGrid>
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imageUrl} />;
    </>
  );
}
