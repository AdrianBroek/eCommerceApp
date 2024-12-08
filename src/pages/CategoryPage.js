import {useEffect, useState, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import Products from "../components/Products";
import categoryProductsAction from "../actions/categoryProductsAction";
import { useLocation } from "react-router-dom";
import CategorySquare from '../components/CategorySquare'
import categoriesDataAction from '../actions/categoriesDataAction'
// dummyData
import dummyData from '../dummyProductsData'
import DummyProducts from '../components/DummyProducts'
import { Swiper, SwiperSlide, swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/scrollbar';

// import required modules
import { FreeMode, Scrollbar } from 'swiper/modules';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const {pathname} = useLocation()
    const [swiper, setSwiepr] = useState(null);

    const {data, isLoading} = useSelector(state => state.categoryProducts)
    const {dataCat, isLoadingCat, activeCategory} = useSelector(state => state.categories)
    
    // settingActiveCat when someone gives u a link or smh
    useEffect(()=> {
      if(activeCategory == null){ 
        const link = pathname.substring(pathname.lastIndexOf("/"))
        const linkDone = link.replace("/", '')
        dispatch({
          type: "SET_ACTIVE_CATEGORY", 
          payload: linkDone
        })
      }
    },[])

    // slider
    useEffect(()=> {
        dataCat.forEach((el, index)=>{
            if(el.slug === activeCategory){
                swiper.slideTo(index, 300, false)
            }
        })
    },[activeCategory,dataCat])
    
    // products updating
    useEffect(()=> {
      // dispatch(categoryProductsAction(pathname.substring(pathname.lastIndexOf("/"))))
      if (activeCategory){
        dispatch(categoryProductsAction('/' + activeCategory))
        
      }else {
        dispatch(categoryProductsAction(pathname.substring(pathname.lastIndexOf("/"))))
      }
      dispatch(categoriesDataAction())
    },[activeCategory])

    return (
        <section>
            <h2 style={{margin: '2rem auto', width: 'fit-content'}}>Pick category:</h2>
            <section className="categories-list">
                <Swiper 
                  onSwiper={setSwiepr}
                  scrollbar={{
                    hide: true,
                  }}
                  freeMode={true}
                  centeredSlides={true}
                  slidesPerView={1}
                  spaceBetween={5}
                  breakpoints={{
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 40,
                    },
                    1300: {
                      slidesPerView: 5,
                      spaceBetween: 50,
                    },
                  }}
                  modules={[Scrollbar,FreeMode]}
                  >
                    {!isLoadingCat && dataCat.map((el, index) => (
                        <SwiperSlide>
                          <CategorySquare key={el.slug} cat={el} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
            <section className="product-list">
                {isLoading ? dummyData.map((el,index)=> (<DummyProducts key={index} props={el}/>)) : ""}

                {!isLoading && data.map((el) => (
                  <Products key={el.id} props={el}/>
                ))} 
            </section>
        </section>
    )
}

export default ProductsPage