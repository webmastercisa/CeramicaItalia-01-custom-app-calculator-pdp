import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useQuery } from 'react-apollo'
import GET_PRODUCT_BY_SKU from '../graphql/GET_PRODUCT_BY_SKU.graphql'
import { CSS_HANDLES, formatter } from '../constant'
import { Product, ProductSpecification } from '../typings/ProductType'
import { IcoLess, IcoMore } from '../svg/Icos'
interface Props {
    sku:string
    cantGlue:number
    checkGlue:boolean
    setCheckGlue:(checkGlue:boolean)=>void
    setCantGlue:(cantGlue:number)=>void
    setMountGlue:(mount:number)=>void
    setUnitMultiplierGlue:(unitGlue:number)=>void
}
export const GlueBySku = ({sku, cantGlue, setCantGlue, setMountGlue, setUnitMultiplierGlue, checkGlue, setCheckGlue}:Props) => {
    const handles = useCssHandles(CSS_HANDLES)
    const [product, setProduct] = useState<Product>()
    const { loading, data } = useQuery(GET_PRODUCT_BY_SKU, {
      variables: {
        value: sku
      },
    })
    useEffect(() => {
      if (data?.product) {
        setProduct(data?.product)
        const Coverage = data?.product.properties.find((pro:ProductSpecification)=>pro.name==='Cobertura')
        if(Coverage && Coverage.values.length > 0){
            setUnitMultiplierGlue(parseFloat(Coverage.values[0]))
        }
        const Price = data?.product?.priceRange.sellingPrice.highPrice
        const taxPercentage = data?.product?.items[0]?.sellers[0]?.commertialOffer.taxPercentage
        const sellingPriceWithTax = (Price && taxPercentage && taxPercentage !== 0) ? Price + (Price * taxPercentage) : Price
        setMountGlue(sellingPriceWithTax)
      }

    }, [data, loading])
    const imageUrl = product?.items[0]?.images[0]?.imageUrl
    const Price = product?.priceRange.sellingPrice.highPrice
    const unitMultiplier = product?.items[0]?.unitMultiplier
    const taxPercentage = product?.items[0]?.sellers[0]?.commertialOffer.taxPercentage
    const sellingPriceWithTax = Price && taxPercentage ? Price + (Price + taxPercentage) : Price

  return (
    <div className={handles.container_glue} onClick={()=>setCheckGlue(!checkGlue)}>
        <input className={handles.glue_input_checkbox} type="checkbox" checked={checkGlue} />
        <img className={handles.glue_img} src={imageUrl}/>
        <span className={handles.glue_name}>
            {product?.productName}
        </span>
        <div className={handles.glue_value_content}>
            <span className={handles.glue_value_text}>
                Valor Unitario
            </span>
            <span className={handles.glue_value}>
            {formatter.format((sellingPriceWithTax && unitMultiplier) ? sellingPriceWithTax : 0)}
            </span>
        </div>
        <div className={handles.glue_content_select}>
            <button className={handles.glue_btn_less} onClick={(e)=>{
                    e.stopPropagation()
                    setCantGlue(cantGlue > 0 ? cantGlue - 1 : 0)
                }}>
                <IcoLess/>
            </button>
            <span className={handles.glue_btn_count}>
                {cantGlue}
            </span>
            <button className={handles.glue_btn_more} onClick={(e)=>{
                    e.stopPropagation()
                    setCantGlue(cantGlue + 1)
                }}>
                <IcoMore/>
            </button>
        </div>
        <div className={handles.glue_content_total}>
            <span className={handles.glue_total_text}>
                Total
            </span>
            <span className={handles.glue_total}>
                {formatter.format((sellingPriceWithTax && unitMultiplier) ? (sellingPriceWithTax * unitMultiplier) * cantGlue : 0)}
            </span>
        </div>
    </div>
  )
}
