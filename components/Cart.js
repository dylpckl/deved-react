import { useStateContext } from "../lib/context";
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Checkout,
  Cards
} from "../styles/CartStyles";
import { Quantity } from "../styles/ProductDetails";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

//Animation variants
const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
}

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

export default function Cart() {
  const { cartItems, showCart, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext();

  return (
    <CartWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        initial={{ x: '50%' }}
        animate={{ x: '0%' }}
        exit={{ x: '50%' }}
        transition={{ type: 'tween' }}
        onClick={(e) => e.stopPropagation()}

      >
        {/* If no items in cart, render empty */}
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>empty</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {/* if more than 1 item in cart, map over items and display info */}
        <Cards variants={cards} initial='hidden' animate='show' layout>
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <Card
                  variants={card}
                  layout
                  key={item.slug}>
                  <img
                    src={item.image.data.attributes.formats.thumbnail.url}
                    alt={item.title}
                  />
                  <CardInfo>
                    <h3>{item.title}</h3>
                    <h3>${item.price}</h3>
                    <Quantity>
                      <span>Quantity</span>
                      <button onClick={() => onRemove(item)}>
                        <AiFillMinusCircle />
                      </button>
                      <p>{item.quantity}</p>
                      <button onClick={() => onAdd(item, 1)}>
                        <AiFillPlusCircle />
                      </button>
                    </Quantity>
                  </CardInfo>
                </Card>
              );
            })}
        </Cards>
        {cartItems.length >= 1 && (
          <Checkout><h3>Subtotal: ${totalPrice}</h3><button>Purchase</button></Checkout>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
