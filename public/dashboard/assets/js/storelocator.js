function displayDirections(destination) {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  const request = {
    origin: userLocation,
    destination: destination,
    travelMode: 'DRIVING'
  };

  directionsService.route(request, (result, status) => {
    if (status === 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
}
const ContentRecommendation = () => {
  const recommendations = useSelector((state) => state.recommendations);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Recommended Content</h2>
      <ul>
        {recommendations.map((recommendation) => (
          <li key={(link unavailable)}>{recommendation.title}</li>
        ))}
      </ul>
    </div>
  );
};