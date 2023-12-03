import { Button, Form, InputNumber, Modal } from 'antd'
import React from 'react'
import { useImperativeHandle } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearDataById } from '../../redux'
import {IoIosColorPalette, IoMdResize } from 'react-icons/io';
import { FaTshirt } from 'react-icons/fa';
import { formatPrice } from '../../../../helpers/formatPrice'

export default forwardRef((props, ref) => {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const { dataById } = useSelector(state => state.products)

    const close = useCallback(() => {
        setOpen(false)
        dispatch(clearDataById())
    })
    

    useImperativeHandle(
      ref,
      () => ({
        open: () => setOpen(true),
        close
      }),
      [],
    )


  return (
    <Modal
    width={950}
    open={open}
    footer={null}
    onCancel={close}
    >
        <div className='w-full my-5 px-7'>
            <div className="w-full flex justify-center items-start gap-6">
                <div className='w-1/3'>
                    <img src={dataById?.img} style={{minHeight: 400, objectFit: "cover"}} />
                </div>
                <div className='w-2/3'>
                    <div className='w-full h-full flex flex-col justify-between items-start gap-4'>
                        <div className='w-full'>
                            <h3 className="text-start text-4xl font-bold mb-1">{dataById?.name}</h3>
                            <h4 className="text-start text-2xl border-violet-gradient no-rounded only-bottom mb-6 pb-2">{formatPrice(dataById?.price)}</h4>
                            <p>{dataById?.description}</p>

                            <div className='w-full flex justify-between items-center gap-4 my-5'>
                                <div className='flex justify-start items-center gap-2'>
                                    <div className='flex justify-start items-center gap-1 text-black font-bold '>
                                        <IoIosColorPalette  />
                                        <span>Colores:</span>
                                    </div>
                                    <span className='text-gray-500'>{dataById?.color}</span>
                                </div>

                                <div className='flex justify-start items-center gap-2'>
                                    <div className='flex justify-start items-center gap-1 text-black font-bold '>
                                        <IoMdResize  />
                                        <span>Tallas:</span>
                                    </div>
                                    <span className='text-gray-500'>{dataById?.sizes}</span>
                                </div>

                                <div className='flex justify-start items-center gap-2'>
                                    <div className='flex justify-start items-center gap-1 text-black font-bold '>
                                        <FaTshirt  />
                                        <span>Tipo de Manga:</span>
                                    </div>
                                    <span className='text-gray-500'>{dataById?.sleeves}</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <Form
                            layout='vertical'
                            >
                                <div className='w-full flex justify-start items-center gap-4 mt-5 px-5'>
                                <Form.Item
                                    rules={[{ required: true, message: "Este campo es obligatorio." }]}
                                    label="Cantidad"
                                    name={"quantity"}
                                >
                                    <InputNumber
                                    min={1}
                                    max={dataById?.quantity}
                                    addonAfter={<span> / {dataById?.quantity}</span>}
                                    placeholder="Cantidad a comprar"
                                    />
                                </Form.Item>
                                <Button
                                    className='bg-green-500'
                                    htmlType="submit"
                                    type="primary"
                                >
                                    Comprar
                                </Button>
                                </div>
                            </Form>

                        </div>
                    </div>


                </div>
                
            </div>
        </div>

    </Modal>
  )
})
