import { Badge, Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { formatPrice } from "../../../../helpers/formatPrice";
import  './index.css';

export default ({ item, onClick }) => {
  const ribbonTitle = item?.quantity > 0
  ? `${item?.quantity} unidades`
  : "Producto agotado"

  const ribbonColor = item?.quantity > 0 ? "orange" : "gray"

  return (
    <div 
    key={item?.id} className="col-span-2 my-3"
    onClick={() => onClick && onClick(item)}
    >
      <Badge.Ribbon
        color={ribbonColor}
        text={ribbonTitle}
      >
        <Card
          className="w-full cardProduct"
          hoverable
          cover={
            <img className="object-contain" alt="example" src={item?.img} />
          }
        >
          <Meta
            title={<h3 className="text-start">{item?.name}</h3>}
            description={
              <div className="flex flex-col gap-1 justify-start items-start px-3">
                <span className="text-sm text-gray-500">
                  Colores: {item?.color}
                </span>
                <span className="text-sm text-gray-500">
                  Tallas: {item?.sizes}
                </span>
                <span className="text-xl font-bold text-black mt-3">{formatPrice(item?.price)}</span>
              </div>
            }
          />
        </Card>
      </Badge.Ribbon>
    </div>
  );
};
