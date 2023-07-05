import './GridItem.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type Item = {
  url: String
}

function GridItem({item, logData, activeId} : {item: Item, activeId: Number, logData: Function}) {
  
  let split = item.url.split('/');
  const id = split[split.length - 2];
  
  // @ts-ignore
  let gridClass = parseInt(activeId.current) !== parseInt(id) ? 'app__grid-item' : 'app__grid-item app__grid-item--active'


  return (
    <>
      <div className={gridClass} onClick={()=>logData(item.url, id)}>
        <LazyLoadImage
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          className="app__grid-item__image"
        />
      </div>
    </>
  )
}

export default GridItem
