import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import booksAction from "../actions/bookAction";
import changeAuthor from "../actions/changeAuthorAction";
import changeTitle from "../actions/changeTitleAction";
import productsDataAction from '../actions/productsDataAction'
import categoriesDataAction from '../actions/categoriesDataAction'
import Products from '../components/Products'
import CategorySquare from '../components/CategorySquare'
import '../styles/app.scss'
import { Routes , Route, useLocation } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();

  const location = useLocation()

  useEffect(()=> {
    dispatch(productsDataAction())
    dispatch(categoriesDataAction())
  },[dispatch])

  const {data, isLoading} = useSelector(state => state.items)
  const {dataCat, isLoadingCat} = useSelector(state => state.categories)
  const {autor, tytuł} = useSelector(state => state.books)

  return (
    <div className="HomePage">
        <section className="categories-list flex">
          <h2>Pick category:</h2>
          {!isLoadingCat && dataCat.map((el, index) => (
             <CategorySquare key={index} cat={el} />
          ))}
        </section>
        <section className="product-list">
          {!isLoading && data.map((el) => (
              <Products key={el.id} props={el}/>
          ))}
        </section>

        <h3>{autor}</h3>
    </div>
  );
}

export default HomePage;
