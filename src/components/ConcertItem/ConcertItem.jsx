function ConcertItem({ concert }) {
    // console.log(concert);
    return (
      <div>
        <img src={concert.images[0].url} width={200} />
        <h2>{concert.name}</h2>
        <p>{concert.info}</p>
        <p>Price:{concert.priceRanges && concert.priceRanges[0].min}</p>
        <h3>{concert.dates.start.localDate}</h3>
      </div>
    );
  }
  
  export default ConcertItem;
  