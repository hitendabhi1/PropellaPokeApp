import { useEffect, useState, useRef } from 'react'
import axios from 'axios';

// @ts-ignore
import { bulbasaurObject } from '../../assets/templates/pokemon.js'
// components
import GridItem from '../../components/GridItem'
import Spinner from '../../components/Spinner';
import CarouselButton from '../../components/CarouselButton';

// styles
import './base.scss';
import SelectedContainer from '../../components/SelectedContainer';


function App() {
  const [pokemon, setPokemon] = useState<Object>(false);
  const [selected, setSelected] = useState<Object>(bulbasaurObject);
  const [loading, setLoading] = useState(false);
  const next = useRef(false);
  const prev = useRef(false);
  const activeId = useRef(1);


  type Options = {
    method: string;
    url: any;
    params: any
  };

  type Data = {
    next: string;
    previous: string;
    results: any
  };
  
  const options: Options = {
    method: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon/',
    params: false
  }

  async function getQuotes() {

    options['params'] = {
      limit: 20,
      offset: 0
    }

    setLoading(true);

    await axios
      .request(options)
      .then(function ({ data }: { data: Data }) {
        setPokemon(data?.results);

        // @ts-ignore
        next.current = data?.next;
        setLoading(false);
      })
      .catch(function (error: any) {
        console.error(error);
      });
  }

  const logData = (url: String, id: Number) => {
    options['url'] = url;

    axios
      .request(options)
      .then(function ({ data }: { data: Data }) {
        setSelected(data);

        // @ts-ignore
        activeId.current = id;
      })
      .catch(function (error: any) {
        console.error(error);
      });
  }

  const getNextOffset = async () => {
    options['url'] = next.current;
    setLoading(true);

    await axios
      .request(options)
      .then(function ({ data }: { data: Data }) {
        // @ts-ignore
        next.current = data?.next;

        // @ts-ignore
        prev.current = data?.previous;
        setPokemon(data?.results);
        setLoading(false);
      })
      .catch(function (error: any) {
        console.error(error);
      });
  }

  const getPrevOffset = async () => {
    options['url'] = prev.current;

    setLoading(true);
    await axios
      .request(options)
      .then(function ({ data }: { data: Data }) {
        // @ts-ignore
        next.current = data?.next;
        // @ts-ignore
        prev.current = data?.previous;
        setPokemon(data?.results);
        setLoading(false);
      })
      .catch(function (error: any) {
        console.error(error);
      });
  }

  useEffect(() => {
    getQuotes();
  }, [])


  return (
    <>
      {
        pokemon &&
        <div className="app">
          {
            // @ts-ignore
            selected && <SelectedContainer selectedPokemon={selected} />
          }
          <div className="app__wrapper">
            { prev.current && <CarouselButton direction={'prev'} handleEvent={getPrevOffset} /> }
            { next.current && <CarouselButton direction={'next'} handleEvent={getNextOffset} /> }
            <div className="app__grid">
              {
                // @ts-ignore
                loading === true ? (<Spinner />) : (pokemon.map((item: string, index: number) => (
                  // @ts-ignore
                  <GridItem key={index} logData={logData} activeId={activeId} index={index} item={item} />
                )))
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default App
