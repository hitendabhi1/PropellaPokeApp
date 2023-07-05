import './CarsouselButton.scss';

function CarouselButton({direction, handleEvent}: { direction: string, handleEvent: Function}) {

  return (
    <button className={`carousel-button carousel-button--${direction}`} onClick={() => handleEvent()}>
        <svg 
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
            d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z"
            fill="CurrentColor"
        />
        </svg>
        <span className='screen-reader-text'>Click for {direction} items</span>
    </button>
  )
}

export default CarouselButton;