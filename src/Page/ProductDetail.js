import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const params = useParams()

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${params.id}`)
        .then(response => {
            if (response.data !== null) {
              setProduct({...response.data})
            } else {
              return Promise.reject({errorMessage: "Product not available"})
            }
        })
        .catch(error=> {
          setProduct({...error})
        })
    }, [])

  return (
    <section>
      <div className='container py-10'>
        {/* ngecek di dalam project product ada property tertentu atau engga */}
        {product.hasOwnProperty("errorMessage") && <h3 className='text-2xl text-center'>{product.errorMessage}</h3>}
        {product.hasOwnProperty("title") && 
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <div>
              <img src={product.image} className='max-w-full aspect-square object-contain' alt=""/>
            </div>
            <div>
              <h2 className='text-2xl mb-4 font-bold'>{product.title}</h2>
              <h1 className='text-4xl text-red-500 mb-4 font-extrabold'>${product.price}</h1>
              <div>{product.description}</div>
              <button className='bg-green-500 border-o px-6 py-2 text-white mt-8'>Add to cart</button>
            </div>
          </div>
        }
      </div>
    </section>
  )
}

export default ProductDetail