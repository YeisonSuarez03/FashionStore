import { Button, Drawer, Empty, message } from 'antd'
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ListItemProduct from '../ListItemProduct'
import { formatPrice } from '../../../../helpers/formatPrice'
import Swal from 'sweetalert2'
import { clearResults } from '../../redux'

export default forwardRef((props, ref) => {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const {dataCart} = useSelector(state => state.products)

    const close = useCallback(() => setOpen(false))

    const handleOnClickBuy = useCallback(() => {
        if (dataCart?.length <=0) 
            return message.error("Agrega al menos un producto al carrito", 4);
        Swal.fire("Compra exitosa", "Se ha procesado tu compra para los articulos seleccionados.", "success");
        dispatch(clearResults())
        close()
    }, [dataCart])

    useImperativeHandle(
      ref,
      () => ({
        open: () => setOpen(true),
        close
      }),
      [],
    )

  return (
    <Drawer
    title={<h2 className='text-xl'>Carrito de compras</h2>}
    open={open}
    onClose={close}
    footer={
        <div className='w-full flex flex-col items-center gap-0 px-4'>
            <span className='text-lg mb-4'>Total: <b>{formatPrice(dataCart?.reduce((p,v) => p + (v?.price * v?.quantity),0))}</b></span>
            <Button
                className='bg-green-500 text-white'
                htmlType="submit"
                type="default"
                onClick={handleOnClickBuy}
            >
                Comprar
            </Button>

        </div>
    }
    >
        {
            dataCart?.map(item => (
                <ListItemProduct item={item} />
            ))
        }
        {
            !dataCart || dataCart?.length <= 0 && (
                <Empty
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                description={<p>No tienes productos agregados al carrito aún</p>} 
                />
            )
        }

    </Drawer>
  )
})
