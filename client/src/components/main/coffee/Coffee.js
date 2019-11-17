import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import AddShopToCoffee from './AddShopToCoffeeSearch';
import CoffeeShopIndex from '../coffee_shop/CoffeeShopIndex';

import Queries from "../../../graphql/queries";
const { FETCH_COFFEE } = Queries;

export default () => {
  const { coffeeId } = useParams();
  const { data, error, loading } = useQuery(FETCH_COFFEE, {
    variables: { id: coffeeId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const {
    coffee: { id, name, origin, processing, roasting, flavor, price, shops = [] }
  } = data;
  console.log(shops);

  return (
    <div className="coffee-detail">
      <img src="nope" alt={`${name} coffee bag`} />
      <div className="coffee-main-info">
        <h1>{name}</h1>
        <h4>{origin}</h4>
      </div>
      <div className="coffee-extra-info">
        <ul>
          <li>
            <s>Origin:</s>
            <span>{origin}</span>
          </li>
          <li>
            <s>Roast:</s>
            <span>{roasting}</span>
          </li>
          <li>
            <s>Processing Method:</s>
            <span>{processing}</span>
          </li>
          <li>
            <s>Flavor:</s>
            <span>{flavor}</span>
          </li>
          <li>
            <s>Price:</s>
            <span>{price}</span>
          </li>
        </ul>
        <section className="coffee-detail-shop-index">
          <h5>Coffee shops who serve this coffee:</h5>
          <CoffeeShopIndex coffeeShops={ shops } />
          <AddShopToCoffee coffeeId={ id } />
        </section>
      </div>
    </div>
  );
};

