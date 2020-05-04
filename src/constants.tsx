import { TableColumn } from "./models/TableColumn";

export const stateAbbreviations = [
    'All', 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  export const restaurantColumns = [new TableColumn('Name', 'name', '25vw'),
                                  new TableColumn('City', 'city', '15vw'),
                                  new TableColumn('State', 'state', '10vw'),
                                  new TableColumn('Phone Number', 'telephone', '15vw'),
                                  new TableColumn('Genre', 'genre', '35vw')];
