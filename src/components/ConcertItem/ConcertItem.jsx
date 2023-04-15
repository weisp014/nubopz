import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

function ConcertItem({ concert }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDetails = () => {
    console.log('in HandleDetails for id:', concert.id);
    dispatch({
      type: "FETCH_CONCERT_DETAILS",
      payload: concert.id
    })
    history.push("/details")
  }

  return (
    <div>
      <img src={concert.images[0].url} width={200} />
      <h2>{concert.name}</h2>
      <p>{concert._embedded && concert._embedded.venues[0].name}</p>
      {/* <p>Price:{concert.priceRanges && concert.priceRanges[0].min}</p> */}
      <h3>{concert.dates.start.localDate}</h3>
      <button onClick={handleDetails}>Details</button>
    </div>
  );
}

export default ConcertItem;
