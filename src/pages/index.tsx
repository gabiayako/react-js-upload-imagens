import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = ({ pageParam = null }) => {
    return api.get(`/api/images`, { params: { pageParam } });
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage.data.after,
  });

  const formattedData = useMemo(() => {
    const pagesData = data?.pages.map(pages => pages.data.data);
    return pagesData?.flat();
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  const handleButtonClick = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage ? (
          <Button onClick={handleButtonClick} bg="#DD6B20" mt="2rem">
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        ) : null}
      </Box>
    </>
  );
}
