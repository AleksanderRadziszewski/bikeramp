### Create trips

#### Descirption
***

This endpoint logs the trip and automatically calculates the distance between start and destination addresses.

**HTTP method**: POST <br>
**Parameters in request body**:

- start_address (Start address in format:"Plac Europejski 2, Warszawa, Polska")
- destination_address (Start address in format:"Plac Europejski 2, Warszawa, Polska")
- price (Package price in PLN)
- date (Date of delivery)

#### Screenshots
***

1. Without specyfing price and date of delivery.

<img width="839" alt="create_trips_price0" src="https://user-images.githubusercontent.com/56914063/184539297-5ae50ab8-1b8b-4630-9896-e52451df3f5b.png">

2. With specyfing price and date of delivery.

<img width="419" alt="create_trips" src="https://user-images.githubusercontent.com/56914063/184539317-ab944669-9c6b-4cbe-b4e2-48af42d2e2e3.png">
