import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  HiMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'react-icons/hi';
import { Button } from './ui/button';
import { IProduct } from '@/types/globalTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToCart, removeFromCart, removeOne } from '@/redux/features/cart/cartSlice';

export default function Cart() {

  const {products,total} = useAppSelector((state)=>state.cart)
  const dispatch =useAppDispatch()
  
  console.log("🚀 ~ file: Cart.tsx:21 ~ Cart ~ products:", products)


  //! Dummy data


  // const products: IProduct[] = [];
  // const total = 0;

  //! **

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <HiOutlineShoppingCart size="25" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <h1>Total: {total.toFixed(2)}</h1>
        </SheetHeader>
        <div className="space-y-5">
          {products?.map((product:IProduct) => (
            <div
              className="border lg:h-[14rem] lg:p-5 py-2  block lg:flex justify-between rounded-md"
              key={product.name}
            >
              <div className="border-r pr-5 shrink-0">
                <img src={product?.image} alt="" className="h-[100%]" />
              </div>
              <div className="px-2 w-full flex flex-col gap-3">
                <h1 className="text-2xl self-center">{product?.name}</h1>
                <p>Quantity: {product.quantity}</p>
                <p className="text-xl">
                  Total Price: {(product.price * product.quantity!).toFixed(2)}{' '}
                  $
                </p>
              </div>
              <div className="border-l pl-5 flex flex-col justify-between gap-3">
                <Button
                onClick={()=>dispatch(addToCart(product))}
                >
                  <HiOutlinePlus size="20" />
                </Button>
                <Button onClick={()=>dispatch(removeOne(product))} >
                  <HiMinus size="20" />
                </Button>
                <Button
                onClick={()=>dispatch(removeFromCart(product))}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                >
                  <HiOutlineTrash size="20" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
