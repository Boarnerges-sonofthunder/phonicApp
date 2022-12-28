import React from 'react'
import UserPanier from './UserPanier'


const ListeArticlePanier = ({cartProducts ,cartProductIncrease, cartProductDecrease}) => {
  return cartProducts.map((product) => (
    <UserPanier key={product._id} product={product} cartProductIncrease={cartProductIncrease} cartProductDecrease={cartProductDecrease} />
  ))
}

export default ListeArticlePanier