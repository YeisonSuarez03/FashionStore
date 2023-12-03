import { Checkbox, Form, Input, Result, Slider, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useCallback, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../helpers/formatPrice";
import ProductCard from "./components/ProductCard";
import { filters } from "./data";
import { search, setFilter } from "./redux";

export default () => {
  const dispatch = useDispatch();
  const [form] = useForm();

  const { error, loading, data, prices, colors, sizes, sleeves, name } =
    useSelector((state) => state.products);

  const handleSetFilters = useCallback((values) => {
    for (const key in values) {
      const value = values[key];
      dispatch(setFilter({ filter: key, value }));
    }
  });

  useEffect(() => {
    dispatch(search());
  }, [prices, colors, sizes, sleeves, name]);

  return (
    <div className="w-full h-full px-20 pt-6 pb-32">
      <div className="w-full mt-12 mb-32">
        <h1 className="text-center text-6xl font-light border-violet-gradient no-rounded only-bottom thicker pb-10">Busca tus productos en nuestro <b>catálogo virtual</b> </h1>
      </div>

      <div className="w-full grid grid-cols-10">
        <div className="col-span-2">
          <Form
            layout="vertical"
            form={form}
            onValuesChange={(changed, values) => handleSetFilters(values)}
          >
            <Form.Item
              name={"name"}
              className="mb-6"
            >
              <Input 
              prefix={<MdSearch />}
              placeholder="Buscar por nombre..." 
              />
            </Form.Item>
            <Form.Item
              label={"Rango de precio"}
              name={"prices"}
              className="mb-6"
            >
              <Slider
              min={filters?.prices?.min}
              max={filters?.prices?.max}
              step={10000} 
              range
              tooltip={{
                formatter: (value) => formatPrice(value),
                placement: "bottom"
              }}
              marks={{
                [filters?.prices?.min]: formatPrice(filters?.prices?.min),
                [filters?.prices?.max]: formatPrice(filters?.prices?.max),
              }}
              />
            </Form.Item>
            <Form.Item
              label={"Colores"}
              name={"colors"}
              className="mb-6"
            >
              <Checkbox.Group style={{width: "100%"}}>
                <div className="w-full pl-10 flex flex-col justify-start items-start gap-2">
                  {
                    filters?.colors?.map(v => (
                      <Checkbox value={v?.name} className="font-light text-gray-700">{v?.name}</Checkbox>
                    ))
                  }
                </div>

              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label={"Tallas"}
              name={"sizes"}
              className="mb-6"
            >
              <Checkbox.Group style={{width: "100%"}}>
              <div className="w-full pl-10 flex flex-col justify-start items-start gap-2">
                  {
                    filters?.sizes?.map(v => (
                      <Checkbox value={v?.name} className="font-light text-gray-700">{v?.name}</Checkbox>
                    ))
                  }
              </div>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label={"Tipo de manga"}
              name={"sleeves"}
              className="mb-6"
            >
              <Checkbox.Group style={{width: "100%"}}>
              <div className="w-full pl-10 flex flex-col justify-start items-start gap-2">
                  {
                    filters?.sleeves?.map(v => (
                      <Checkbox value={v?.name} className="font-light text-gray-700">{v?.name}</Checkbox>
                    ))
                  }
              </div>
              </Checkbox.Group>
            </Form.Item>

          </Form>
        </div>
        <div className="col-span-8">
          <Spin spinning={loading} tip="Cargando..." wrapperClassName="w-full">
            <div className="w-full grid grid-cols-6 gap-5 pl-16">
              {
                data?.map((item) => (
                  <ProductCard key={item?.id} item={item} />
                ))
              }
              {
                !data || data?.length <= 0 && (
                  <Result
                  className="col-span-6 px-5 py-3"
                  title="No hay resultados" 
                  subTitle="No se han encontrado resultados para los filtros seleccionados."
                  />
                )
              }
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};
