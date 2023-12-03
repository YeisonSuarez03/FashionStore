import React from 'react'
import { setDeleteFromCart, setUpdateFromCart } from '../../redux'
import { InputNumber, Typography } from 'antd'
import { FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

export default ({item}) => {

  const dispatch = useDispatch()
    
  return (
    <div className='w-full flex justify-between items-center'>
            <div className='flex justify-center items-center gap-2'>
                <img
                    src={item?.img}
                    className="object-contain my-2"
                    style={{ maxWidth: 70, maxHeight: 100 }}
                />
                <div style={{ maxWidth: 140 }}>
                    <div className="flex flex-col justify-center">
                        <Typography.Text ellipsis={{ tooltip: item?.name }} className='text-sm font-bold'>{item?.name}</Typography.Text>
                        <span className='text-sm text-gray-400 font-light'>Color {item?.color}</span>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center gap-2'>
                <div>
                    <InputNumber
                        style={{ maxWidth: 60 }}
                        min={1}
                        max={item?.quantityMax}
                        value={item?.quantity}
                        defaultValue={1}
                        onChange={(v) => {
                            if (v > 0) {
                                dispatch(setUpdateFromCart({ id: item?.id, quantity: v }))
                            }
                        }}
                    />
                </div>
                <div
                    className='cursor-pointer'
                    onClick={() => {
                        dispatch(setDeleteFromCart(item?.id))
                    }}
                >
                    <FaTrash className='text-lg' />
                </div>
            </div>
        </div>
  )
}
