import { createContext, useEffect, useState } from "react";
export const CartContext = createContext();
import pizzaCart from '../../pizzas.js';


const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [amount, setAmount] = useState(0);

	useEffect(() => {
        calculateTotal();
    }, [cart]);

    const addToCart = (pizza) => {
		const findPizzaIndex = cart.findIndex(prodCart => prodCart.id === pizza.id); //Verifica si el elemento existe en el carrito
		if (findPizzaIndex >= 0) { // si encuentra
			const updatedCart = [...cart];
			updatedCart[findPizzaIndex].quantity += 1; //aumento la cantidad
			setCart(updatedCart); // guardo el nuevo estado del carro
		}
        else { // si no existe
			const addNewElement = [...cart, pizza];
			setCart(addNewElement); // actualizo nuevo estado del carro
		}
	};

    //Estas funciones son para [+] y [-] utilizado en el componente "Product.jsx" que se encuentra en la Cart.jsx
    const agregarPizza = (productId, cantidad) => {
        setCart((prevCart) => {
                                const newCart = { ...prevCart };
                                if (cantidad > 0) {
                                if (newCart[productId]) {
                                    newCart[productId].cantidad = cantidad;
                                } else {
                                    const product = pizzaCart.find(p => p.id === productId);
                                    newCart[productId] = { ...product, cantidad };
                                }
                                } else {
                                delete newCart[productId];
                                }
                                return newCart;
                              });
    };

    const eliminarPizza = (productId, cantidad) => {
    setCart((prevCart) => {
                            const newCart = { ...prevCart };
                            if (cantidad > 0) {
                              if (newCart[productId]) {
                                newCart[productId].cantidad = cantidad;
                              }
                            } else {
                              delete newCart[productId];
                            }
                            return newCart;
                          });
    };

    const calculateTotal = () => {
        let total = 0;
        for (const item of Object.values(cart)) {
          total += item.price * item.cantidad;
        }
        setAmount(total);
        console.log (total,"<--total");
      };

  return (
    <CartContext.Provider
      value={{
        addToCart
		    ,agregarPizza
        ,eliminarPizza
        ,cart
        ,pizzaCart
        ,amount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
