/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable padding-line-between-statements */
/* eslint-disable vtex/prefer-early-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, useContext, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { ProductContext } from "vtex.product-context";
import { Spinner, ToastConsumer } from 'vtex.styleguide'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { IcoAlert, IcoCart } from '../svg/Icos'
import { Modal } from '../Atom/Modal'
import { ProductContextState } from '../typings/ProductType';
import { CSS_HANDLES, formatter, validateInputNumber } from '../constant';
//import { GlueBySku } from './GlueBySku';  //============   02.637.443


export const CustomAppCalculator = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const { addItem } = useOrderItems()
  const { product, selectedItem } = useContext<ProductContextState>(ProductContext);
  const [loading, setLoading] = useState(false)
  const [loadingFreeSample, setLoadingFreeSample] = useState(false)
  //const [checkGlue, setCheckGlue] = useState(false)  //============   02.637.443
  //const [skuGlue, setSkuGlue] = useState('')    //============   02.637.443
  const [skuFreeSample, setSkuFreeSample] = useState('')
  const [inputMeters, setInputMeters] = useState(1)
  const [cantBox, setCantBox] = useState(1)
  //const [cantGlue, setCantGlue] = useState(1)  //============   02.637.443
  //const [unitMultiplierGlue, setUnitMultiplierGlue] = useState(0)  //============   02.637.443
  //const [mountGlue, setMountGlue] = useState(0)  //============   02.637.443
  const [checkMore, setCheckMore] = useState(false)
  const [beforeCheckInput, setBeforeCheckInput] = useState(0)
  const [showCal, setShowCal] = useState(false)
  const [showWhy, setShowWhy] = useState(false)


  const [inputMetersAnchoPiso, setInputMetersAnchoPiso] = useState(1)
  const [inputMetersLargoPiso, setInputMetersLargoPiso] = useState(1)
  const [inputMetersTotalPiso, setInputMetersTotalPiso] = useState(inputMetersAnchoPiso * inputMetersLargoPiso)

  const [inputMetersAnchoPared, setInputMetersAnchoPared] = useState(1)
  const [inputMetersAltoPared, setInputMetersAltoPared] = useState(1)
  const [inputMetersTotalPared, setInputMetersTotalPared] = useState(inputMetersAnchoPared * inputMetersAltoPared)
  useEffect(() => {
    if (product) {
      //const Glue = product.properties.find((pro) => pro.name === 'Id SKU Pegante')  //============   02.637.443
      //if (Glue && Glue.values.length > 0) {  //============   02.637.443
      //        setSkuGlue(Glue.values[0])  //============   02.637.443
      //}
      const FreeSample = product.properties.find((pro) => pro.name === 'Id Muestra')
      if (FreeSample && FreeSample.values.length > 0) {
        setSkuFreeSample(FreeSample.values[0])
      }
    }

  }, [product])

  const unitMultiplier = selectedItem?.unitMultiplier
  const Price = selectedItem?.sellers[0]?.commertialOffer.Price
  const taxPercentage = selectedItem?.sellers[0]?.commertialOffer.taxPercentage
  const Tax = selectedItem?.sellers[0]?.commertialOffer.Tax
  const sellingPriceWithTax = (Price && taxPercentage && taxPercentage !== 0 && Tax && unitMultiplier) ? Math.ceil(Price + (Tax / unitMultiplier)) : Price

  const measurementUnit = selectedItem?.measurementUnit

  const inputChange = (input: ChangeEvent<HTMLInputElement>) => {
    const { value } = input.target
    const inputNumber = validateInputNumber(value) ? parseInt(value) : value === '' ? 0 : inputMeters !== 0 ? inputMeters : 0

    setInputMeters(inputNumber)
    setCheckMore(false)
    if (unitMultiplier) {
      const boxCount = Math.ceil(inputNumber / unitMultiplier)
      setCantBox(boxCount)
      //const glue = Math.ceil(((boxCount * unitMultiplier) / unitMultiplierGlue))  //============   02.637.443

      //setCantGlue(glue)  //============   02.637.443
    }

  }

  const inputChangeCalculator = (meters: number) => {

    const inputNumber = meters

    setInputMeters(inputNumber)
    setCheckMore(false)
    if (unitMultiplier) {
      const boxCount = Math.ceil(inputNumber / unitMultiplier)
      setCantBox(boxCount)
      //const glue = Math.ceil(((boxCount * unitMultiplier) / unitMultiplierGlue))  //============   02.637.443

      //setCantGlue(glue)  //============   02.637.443
    }

  }

  const inputChangeAnchoPiso = (input: ChangeEvent<HTMLInputElement>) => {
    const { value } = input.target
    const inputNumber = validateInputNumber(value) ? parseInt(value) : value === '' ? 0 : inputMeters !== 0 ? inputMeters : 0

    setInputMetersAnchoPiso(inputNumber)
    setCheckMore(false)
    const totalAnchopiso = inputNumber * inputMetersLargoPiso
    setInputMetersTotalPiso(totalAnchopiso)

  }

  const inputChangeLargoPiso = (input: ChangeEvent<HTMLInputElement>) => {
    const { value } = input.target
    const inputNumber = validateInputNumber(value) ? parseInt(value) : value === '' ? 0 : inputMeters !== 0 ? inputMeters : 0

    setInputMetersLargoPiso(inputNumber)
    setCheckMore(false)
    const totalLargoPiso = inputNumber * inputMetersAnchoPiso
    setInputMetersTotalPiso(totalLargoPiso)

  }



  const inputChangeAnchoPared = (input: ChangeEvent<HTMLInputElement>) => {
    const { value } = input.target
    const inputNumber = validateInputNumber(value) ? parseInt(value) : value === '' ? 0 : inputMeters !== 0 ? inputMeters : 0

    setInputMetersAnchoPared(inputNumber)
    const totalAnchoPared = inputNumber * inputMetersAltoPared
    setInputMetersTotalPared(totalAnchoPared)

  }


  const inputChangeAltoPared = (input: ChangeEvent<HTMLInputElement>) => {
    const { value } = input.target
    const inputNumber = validateInputNumber(value) ? parseInt(value) : value === '' ? 0 : inputMeters !== 0 ? inputMeters : 0

    setInputMetersAltoPared(inputNumber)
    const totalAltoPared = inputMetersAnchoPared * inputNumber
    setInputMetersTotalPared(totalAltoPared)


  }

  const inputChangeTotalPared = (input: ChangeEvent<HTMLInputElement>) => {
    const { value } = input.target
    const inputNumber = validateInputNumber(value) ? parseInt(value) : value === '' ? 0 : inputMeters !== 0 ? inputMeters : 0

    setInputMetersTotalPared(inputNumber)
    setCheckMore(false)
    if (unitMultiplier) {
      const boxCount = Math.ceil(inputNumber / unitMultiplier)
      setCantBox(boxCount)
      //const glue = Math.ceil(((boxCount * unitMultiplier) / unitMultiplierGlue))  //============   02.637.443

      //setCantGlue(glue)  //============   02.637.443
    }

  }
  const inputChangeTotalPiso = (input: ChangeEvent<HTMLInputElement>) => {
    const { value } = input.target
    const inputNumber = validateInputNumber(value) ? parseInt(value) : value === '' ? 0 : inputMeters !== 0 ? inputMeters : 0

    setInputMetersTotalPiso(inputNumber)
    setCheckMore(false)
    if (unitMultiplier) {
      const boxCount = Math.ceil(inputNumber / unitMultiplier)
      setCantBox(boxCount)
      //const glue = Math.ceil(((boxCount * unitMultiplier) / unitMultiplierGlue))  //============   02.637.443

      //setCantGlue(glue)  //============   02.637.443
    }

  }

  const checkMoreCant = () => {
    if (checkMore) {
      setInputMeters(beforeCheckInput)
      if (unitMultiplier) {
        const boxCount = Math.ceil(beforeCheckInput / unitMultiplier)
        setCantBox(boxCount)
        //const glue = Math.ceil(((boxCount * unitMultiplier) / unitMultiplierGlue))  //============   02.637.443
        //setCantGlue(glue)  //============   02.637.443
      }
    } else {
      setBeforeCheckInput(inputMeters)
      const result = Math.ceil(inputMeters * 1.1)
      setInputMeters(result)
      if (unitMultiplier) {
        const boxCount = Math.ceil(result / unitMultiplier)
        setCantBox(boxCount)
        //const glue = Math.ceil(((boxCount * unitMultiplier) / unitMultiplierGlue))  //============   02.637.443
        //setCantGlue(glue)  //============   02.637.443
      }
    }
    setCheckMore(!checkMore)
  }

  const addToCartAll = async (showToast: any) => {
    setLoading(true)
    const items = [
      {
        id: selectedItem?.itemId,
        quantity: cantBox,
        seller: '1'
      }
    ]

    /*     //============   02.637.443
     if (skuGlue !== '' && cantGlue > 0 && checkGlue) {
       items.push({
         id: skuGlue,
         quantity: cantGlue,
         seller: '1'
       })
     }
     */

    await addItem(items)
    setLoading(false)
    showToast({
      message: `Productos agregados al carrito`,
      duration: 3000,
      horizontalPosition: 'left',
    })
  }

  const Quote = async () => {
    const sumMeters = inputMetersTotalPiso + inputMetersTotalPared
    inputChangeCalculator(sumMeters)
    setShowCal(!showCal)


  }

  const buyFromWhatsapp = async () => {
    window.location.href = 'https://wa.link/haz2np';
  }



  const addToCartFreeSample = async (showToast: any) => {
    setLoadingFreeSample(true)
    const items = []
    if (skuFreeSample !== '') {
      items.push({
        id: skuFreeSample,
        quantity: 1,
        seller: '1'
      })
    }
    await addItem(items)
    setLoadingFreeSample(false)
    showToast({
      message: `La muestra gratis se agregó al carrito`,
      duration: 3000,
      horizontalPosition: 'left',
    })
  }

  return (
    <ToastConsumer>
      {({ showToast }: any) => (
        <div className={handles.container}>
          <div className={handles.input_price}>
            <div className={handles.container_input}>
              <span className={handles.input_text}>
                Ingresa la cantidad de metros que necesitas
              </span>
              <input className={handles.input} value={inputMeters} onChange={inputChange} />
              <div className={handles.content_modal_met}>
                <span className={handles.content_modal_met_text} onClick={() => setShowCal(true)}>
                  ¿Cómo calculo el metraje? usa nuestra calculadora
                </span>
                <Modal show={showCal} setShow={setShowCal} >
                  {/* <div className={handles.modal_open}> */}
                  <div className={handles.title_area_quote}>
                    <span >Cotiza tu Espacio</span>
                  </div>

                  <div className={handles.containercalc}>

                    <div className={handles.columncalc}>

                      <div className={handles.title_area_quote}><span>Piso</span></div>
                      <span className={handles.input_text}>
                        Ingresa Ancho en metros
                      </span>
                      <input className={handles.input} value={inputMetersAnchoPiso} onChange={inputChangeAnchoPiso} />
                      <span className={handles.input_text}>
                        Ingresa Largo en metros
                      </span>
                      <input className={handles.input} value={inputMetersLargoPiso} onChange={inputChangeLargoPiso} />
                      <span className={handles.input_text}>
                        Total Piso m2
                      </span>
                      <input className={handles.input} value={inputMetersTotalPiso} onChange={inputChangeTotalPiso} />
                    </div>
                    <div className={handles.columncalc}>
                      <div className={handles.title_area_quote}><span>Pared</span></div>
                      <span className={handles.input_text}>
                        Ingresa Ancho en metros
                      </span>
                      <input className={handles.input} value={inputMetersAnchoPared} onChange={inputChangeAnchoPared} />
                      <span className={handles.input_text}>
                        Ingresa Alto en metros
                      </span>
                      <input className={handles.input} value={inputMetersAltoPared} onChange={inputChangeAltoPared} />
                      <span className={handles.input_text}>
                        Total Pared m2
                      </span>
                      <input className={handles.input} value={inputMetersTotalPared} onChange={inputChangeTotalPared} />
                    </div>
                    <div className={handles.btn_quote_list}>
                      <button className={handles.btn_quote} disabled={loading} onClick={() => Quote()}>
                        <span className={handles.btn_add_text}>Cotizar</span>
                      </button>
                    </div>

                  </div>

                  {/* </div> */}




                </Modal>
              </div>
              {/* <div className={handles.content_modal_met}>
                <span className={handles.content_modal_met_text} onClick={() => setShowCal(true)}>
                  ¿Cómo calculo el metraje?
                </span>
                <Modal show={showCal} setShow={setShowCal} >
                  <div className={handles.modal_open}>
                    <img src="https://ceramicaitalia.vteximg.com.br/arquivos/Tarjeta-metraje-01.png" alt="calcular metraje" className={handles.img1_modal} />
                    <img src="https://ceramicaitalia.vteximg.com.br/arquivos/Tarjeta-metraje-02.png" alt="calcular metraje" className={handles.img2_modal} />
                    <img src="https://ceramicaitalia.vteximg.com.br/arquivos/Tarjeta-metraje-03.png" alt="calcular metraje" className={handles.img3_modal} />
                    <img src="https://ceramicaitalia.vteximg.com.br/arquivos/Tarjeta-metraje-04.png" alt="calcular metraje" className={handles.img4_modal} />
                  </div>
                </Modal>
              </div> */}
            </div>
            <div className={handles.container_price}>
              <div className={handles.text_price}>
                <span className={handles.text_price_price}>Precio m
                  <span className={handles.text_price_price_top}>2</span>
                </span> <span className={handles.text_price_mount}>{formatter.format((sellingPriceWithTax) ? sellingPriceWithTax : 0)}</span>
              </div>
              <div className={handles.text_price_box}>
                Precio caja: {formatter.format((unitMultiplier && sellingPriceWithTax) ? sellingPriceWithTax * unitMultiplier : 0)}/{unitMultiplier} {measurementUnit}
              </div>
            </div>
          </div>
          <div className={handles.input_radius}>
            <label className={handles.radius_label}>
              <input className={handles.radius_input} type='radio' checked={checkMore} onClick={checkMoreCant} />
              <span className={handles.radius_text}>Agrega 10% más de material ¡TE LO RECOMENDAMOS!</span>
            </label>
            <div className={handles.content_modal_why}>
              <span className={handles.content_modal_why_text} onClick={() => setShowWhy(true)}>¿Por qué? <IcoAlert /></span>
              <Modal show={showWhy} setShow={setShowWhy} >
                <div className={handles.content_modal_why_open}>
                  <span className={handles.content_modal_why_open_text}>Recomendamos agregar 10% adicional para cubrir los desperdicios en la instalación</span>
                </div>
              </Modal>
            </div>
          </div>
          <div className={handles.box_price}>
            <div className={handles.box_content}>
              <span className={handles.box_content_text}>{cantBox}</span>
              <span className={handles.box_content_text_box}>Caja(s)</span>
            </div>
            <div className={handles.content_price}>
              <span className={handles.price}>
                {formatter.format((sellingPriceWithTax && unitMultiplier) ? (sellingPriceWithTax * unitMultiplier) * cantBox : 0)}
              </span>
              <span className={handles.price_text}>
                Total IVA Incluido
              </span>
            </div>
          </div>
          {/*
          <div className={handles.box_additional}>
            {skuGlue !== '' && <GlueBySku sku={skuGlue} checkGlue={checkGlue} setCheckGlue={setCheckGlue} setUnitMultiplierGlue={setUnitMultiplierGlue}
              cantGlue={cantGlue} setCantGlue={setCantGlue} setMountGlue={setMountGlue} />}
          </div>
          */}

          {/*
          <div className={handles.box_total_price}>
            <span className={handles.total_price_text}>
              Total {checkGlue && '+ pegante'}
            </span>
            <span className={handles.total_price_amount}>
              {formatter.format((sellingPriceWithTax && unitMultiplier) ? (((sellingPriceWithTax * unitMultiplier) * cantBox) + (checkGlue ? (mountGlue * cantGlue) : 0)) : 0)}
            </span>
            <span className={handles.total_price_text_b}>
              Total IVA Incluido
            </span>
          </div>
          */}


          <div className={handles.box_btn}>
            <div className={handles.btn_content}>
              <div className={handles.btn_img_list}>
                <img className={handles.btn_img} src='https://ceramicaitalia.vteximg.com.br/arquivos/pagosceramica1.png' />
              </div>
              {/* <div className={handles.content_add_img_text}>
                <img className={handles.content_add_img} src='https://ceramicaitalia.vteximg.com.br/arquivos/ico_ban_it.png' />
                <span className={handles.content_add_text}>Envío Gratis</span>
              </div> */}


              {(!(skuFreeSample === '') || loadingFreeSample) &&
                <div>
                  <div className={handles.btn_img_list}>
                    <button className={handles.btn_add} disabled={loading} onClick={() => addToCartAll(showToast)}>
                      {loading ?
                        <Spinner color="currentColor" size={30} /> :
                        <div className={handles.btn_add_content}>
                          <IcoCart />
                          <span className={handles.btn_add_text}>Añadir al carrito</span>
                        </div>
                      }
                    </button>
                  </div>


                  <div className={handles.input_price}>
                    <div className={handles.container_input}>
                      <button className={handles.btn_buy_sample} onClick={() => addToCartFreeSample(showToast)} >
                        <div className={handles.free_content_text}>
                          <span className={handles.btn_add_text}>
                            <img className={handles.btn_img_whatsapp} src='https://ceramicaitalia.vtexassets.com/assets/vtex.file-manager-graphql/images/9021a85f-3898-45c8-b49a-d602437619f7___e9c6a17924b917d53bead8b3382a7b24.png' />
                            ¡Solicita tu Muestra Gratis!
                          </span>
                          <span className={handles.btn_add_text_whatsapp}>Paga el envío contra entrega</span>
                        </div>
                      </button>
                    </div>

                    <div className={handles.container_price}>
                      <button className={handles.btn_buy_whatsapp} onClick={() => buyFromWhatsapp()}  >
                        <div className={handles.btn_add_content_whatsapp}>
                          <span className={handles.btn_add_text}>
                            <img className={handles.btn_img_whatsapp} src='https://ceramicaitalia.vtexassets.com/assets/vtex.file-manager-graphql/images/9ccc95d1-6540-43bd-b6c7-8a7ccbda6901___b900370a8d6bf4c1ce8ac67712888793.png' />
                            Compra por whatsapp<br />
                          </span>
                          <span className={handles.btn_add_text_whatsapp}>hablar con un asesor</span>
                        </div>
                      </button>
                    </div>

                  </div>


                </div>




                // <button className={handles.btn_free} disabled={(skuFreeSample === '') || loadingFreeSample} onClick={() => addToCartFreeSample(showToast)}>
                //   <div className={handles.btn_free_content}>
                //     <IcoCart />
                //     {loadingFreeSample ?
                //       <Spinner color="currentColor" size={30} /> :
                //       <div className={handles.free_content_text}>
                //         <span className={handles.content_text_free}>¡Solicita tu Muestra Gratis!</span>
                //         <span className={handles.content_text_pay}>Paga el envío contra entrega</span>
                //       </div>}

                //   </div>
                // </button>

              }



              {((skuFreeSample === '')) &&

                <div className={handles.btn_img_list}>
                  <button className={handles.btn_add_with_whatsapp} disabled={loading} onClick={() => addToCartAll(showToast)}>
                    {loading ?
                      <Spinner color="currentColor" size={30} /> :
                      <div className={handles.btn_add_content}>
                        <IcoCart />
                        <span className={handles.btn_add_text}>Añadir al carrito</span>
                      </div>
                    }
                  </button>
                  <button className={handles.btn_whatsapp_buy} onClick={() => buyFromWhatsapp()}>
                    <div className={handles.btn_free_content}>
                      <img className={handles.btn_img_whatsapp} src='https://ceramicaitalia.vtexassets.com/assets/vtex.file-manager-graphql/images/a5d48e97-6888-4da6-a219-084e1f0c552e___32c7001dd8ef25cbf0ea5469117d0b89.png' />
                      <div className={handles.free_content_text}>
                        <span className={handles.content_text_free}>Compra por whatsapp</span>
                        <span className={handles.content_text_pay}>hablar con un asesor</span>
                      </div>
                    </div>
                  </button>
                </div>
              }



            </div>

          </div>
        </div>
      )}
    </ToastConsumer>
  )
}
