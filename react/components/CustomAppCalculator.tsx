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
//import { IcoAlert, IcoCart } from '../svg/Icos'
//import { IcoCart } from '../svg/Icos'
import { IcoCart4628 } from '../svg/Icos'
import { Modal } from '../Atom/Modal'
import { ProductContextState } from '../typings/ProductType';
import { CSS_HANDLES, formatter, validateInputNumber } from '../constant';
//Pegante =========> import { GlueBySku } from './GlueBySku';


export const CustomAppCalculator = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const { addItem } = useOrderItems()
  const { product, selectedItem } = useContext<ProductContextState>(ProductContext);
  const [loading, setLoading] = useState(false)
  const [loadingFreeSample, setLoadingFreeSample] = useState(false)
  //Pegante =========>const [checkGlue, setCheckGlue] = useState(false)
  //Pegante =========>const [skuGlue, setSkuGlue] = useState('')
  const [skuFreeSample, setSkuFreeSample] = useState('')
  const [inputMeters, setInputMeters] = useState(1)
  const [inputMetersRaw, setInputMetersRaw] = useState(1)
  const [cantBox, setCantBox] = useState(1)
  //Pegante =========> const [cantGlue, setCantGlue] = useState(1)
  //Pegante =========> const [unitMultiplierGlue, setUnitMultiplierGlue] = useState(0)
  //Pegante =========> const [mountGlue, setMountGlue] = useState(0)
  const [checkMore, setCheckMore] = useState(false)
  const [beforeCheckInput, setBeforeCheckInput] = useState(0)
  const [showCal, setShowCal] = useState(false)
  const [showWhy, setShowWhy] = useState(false)

  const [inputMetersAnchoPiso, setInputMetersAnchoPiso] = useState(1)
  const [inputMetersLargoPiso, setInputMetersLargoPiso] = useState(1)
  const [inputMetersTotalPiso, setInputMetersTotalPiso] = useState(0)

  const [inputMetersAnchoPared, setInputMetersAnchoPared] = useState(1)
  const [inputMetersAltoPared, setInputMetersAltoPared] = useState(1)
  const [inputMetersTotalPared, setInputMetersTotalPared] = useState(0)
  const MOBILE_BREAKPOINT = 768;
  //const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [isMobile, setIsMobile] = useState(true);


  const StyleContenedor =
  {
    "font-family": "Neutra Display",
    top: "453px",
    left: "1061px",
    width: "100%",
    height: isMobile ? "300px" : "350px",
    "text-align": "center",
  };

  const StyleContenedorInterno =
  {
    width: "100%",
  };

  const ContenedorPriceUnit =
  {
    "padding-top": isMobile ? "1px" : "20px",
    "padding-bottom": isMobile ? "1px" : "20px",
    width: "100%",
    opacity: "1",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  };

  const LabelValorMeterCaja =
  {
    width: "48%",
    height: "30px",
    /* UI Properties */
    "text-align": "center",
    /*"font-family": "NeutraTextBook",*/
    "font-size": isMobile ? "17px" : "26px",
    "letter-spacing": "0px",
    color: "#232323",
    opacity: "1",
    "font-weight": "800",

    /*
    "margin-top": isMobile ?  "15px": "1px",
    */

    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  };

  const StyleLabelValor2 =
  {
    width: "4%",
    height: "10px",
    /* UI Properties */
    "text-align": "center",
    "font-size": isMobile ? "30px" : "36px",
    "font-family": "auto",
    "font-weight": "100",
    "letter-spacing": "0px",
    color: "#232323",
    opacity: "1",

    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  };

  const StyleContenedorLabelInfo =
  {
    width: "100%",
    opacity: "1",
    display: "flex",
    "justify-content": "flex-start",
    "margin-top": isMobile ? '10px' : "1px",
  };

  const StyleLabelInfo1 =
  {
    top: "523px",
    left: "1124px",
    width: "75%",
    height: "16px",
    /* UI Properties */
    "text-align": "center",
    "font-size": isMobile ? '12px' : "16px",
    /*"font-family": "NeutraTextBook",*/
    "letter-spacing": isMobile ? "-0.856px" : "0.2px",
    color: "#747474",
    opacity: "1",
  };

  const StyleLabelInfo2 =
  {
    width: "25%",
    height: "14px",
    "font-size": isMobile ? '8px' : "11px",
    /*"font-family": "NeutraTextBook",*/
    "letter-spacing": "0px",
    "padding-top": "3px",
    color: "#FF0000",
    cursor: "pointer",
    opacity: "1",
  };

  const ContentInputs =
  {
    top: "544px",
    left: "1113px",
    width: "100%",
    height: isMobile ? "42px" : "50px",
    /*
    "margin-top":"5px",
    "margin-bottom":"10px",
    "padding-top":"6px",
    "padding-bottom":"5px",
    */

    /* UI Properties */
    /*"font-family": "NeutraTextBook",*/
    background: "#DAD8D8 0% 0% no-repeat padding-box",
    "border-radius": "10px",
    opacity: "1",
    display: "flex",
    alignItems: 'center',
    minHeight: isMobile ? "40px" : '50px',
    "margin-bottom": "5px",
    "margin-top": isMobile ? "1px" : "5px",
  };

  const ContentInputInt =
  {
    /*
    background: "#AFC 0% 0% no-repeat padding-box",
    "padding-top":"5px",
    */
    width: "48%",
    height: "100%",
    /* UI Properties */
    "text-align": "center",
    "font-size": "24px",
    /*"font-family": "NeutraTextBook",*/
    "letter-spacing": "0px",
    color: "#FF0000",
    opacity: "1",

    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: isMobile ? "40px" : '50px',
  };

  const ContentInputDiv =
  {
    width: "4%",
    height: "20px",
    /* UI Properties */
    "text-align": "center",
    "font-size": isMobile ? "32px" : "36px",
    "font-family": "auto",
    "font-weight": "100",
    "letter-spacing": "0px",
    color: "#000000",
    opacity: "1",


    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  };

  const StyleContentInputcont =
  {
    background: "#FFF 0% 0% no-repeat padding-box",
    "border-radius": isMobile ? "6px" : "13px",
    "padding-top": isMobile ? "10px" : "8px",
    "padding-bottom": "10px",
    width: isMobile ? "85px" : "74px",
    height: isMobile ? "30px" : "38px",
    /* UI Properties */
    "text-align": "center",
    "font-size": "24px",
    /*"font-family": "NeutraTextBook",*/
    "letter-spacing": "0px",
    color: "#FF0000",
    opacity: "1",
    display: "inline-flex",
    "align-items": "center",
  }

  const BtDirL =
  {
    color: "#6A6A6A",
    width: "1px",
    height: "20px",
    border: "none",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    cursor: "pointer",
    "font-size": "10px",
    "margin-top": "12px",
    "margin-left": "4px",
  }

  const BtDirR =
  {
    color: "#6A6A6A",
    width: "1px",
    height: "20px",
    border: "none",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    cursor: "pointer",
    "font-size": "10px",
    "margin-top": "12px",
  }



  const InputMeterBox =
  {
    width: "38px",
    height: isMobile ? "20px" : "26px",
    /* UI Properties */
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    "border-radius": "9px",
    "text-align": "center",
    "font-size": isMobile ? "16px" : "18px",
    /*"font-family": "NeutraTextBook",*/
    color: "#747474",
    border: "none",
    outline: "none",
    opacity: "1",
    "margin-left": "14px",
    "margin-right": "0px",
    "margin-top": "4px",
    "margin-bottom": "2px",
  };

  const LabelInputs =
  {
    top: "556px",
    left: "1261px",
    /*width: "21px",*/
    /*height: isMobile ? "18px":"21px",*/
    height: "100%",
    /* UI Properties */
    "text-align": "left",
    "letter-spacing": "0px",
    "font-size": isMobile ? "16px" : "21px",
    color: "#747474",
    opacity: "1",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  }

  const StyleInputRadio =
  {
    /*"margin-top": "10px",*/
    /*"justify-content": "space-between", */
  }

  /*
    const StyleRadioButton =
    {
      "-webkit-appearance": "none",
      "-moz-appearance": "none",
      width: "20px",
      height: "20px",
      "margin-top": "4px",
      "margin-right": "4px",

      border: "2px solid #333",
      "border-radius": "5px",
      cursor: "pointer",
    }*/
  /*
    const StyleRadioButton =
    {
      container: {
        position: "relative",
        display: "inline-block",
        cursor: "pointer"
      },
      input: {
        display: 'none'
      },
      checkmark: {
        display: 'inline-block',
        width: '16px',
        height: '16px',
        border: '2px solid #999',
        background: 'white',
      },
      checked: {
        '&::after': {
          content: '"✓"',
          color: 'red',
          position: 'absolute',
          left: '50%',
          top: '45%',
          transform: 'translate(-50%, -50%)',
        }
      }
     };
  */


  const StyleRadius_text =
  {
    "padding-left": "1px",
    color: "#747474",
    "font-size": isMobile ? "12px" : "14px",
    "font-style": "normal",
    "font-weight": "550",
    "line-height": "normal",
    "text-align": "center",
  }

  const DivLblMeterTotal =
  {
    width: "100%",
    "padding-top": "10px",
    "box-sizing": "border-box",
    "text-align": "center",
    "letter-spacing": "0px",
    "font-size": isMobile ? "12px" : "14px",
    "padding-bottom": "10px",
  }

  const DivLblPriceTotal =
  {
    width: "100%",
    "box-sizing": "border-box",
    "text-align": "center",
    "letter-spacing": "0px",
    "font-size": isMobile ? "28px" : "34px",
    "font-weight": "bolder",
    display: "block",
    "padding-bottom": "10px"
  }


  /* ============== Boton  =============  */
  const bt_wh_red =
  {
    button:
    {
      width: "100%",
      "background-color": "#FFFFFF",
      border: "3px solid #ED1B24",
      "border-radius": "100px",
      padding: "1px 8px 8px 8px",
      height: "48px",
      color: "#ED1B24",
      cursor: "pointer",
      transition: "color .35s ease-in-out, background-color .35s ease-in-out",
    }
  }
  /*
    const bt_IcoCart =
    {
      height: "48px",
      color: "#ED1B24",
    }
      */

  const bt_wh_red_text =
  {
    "text-decoration": "none",
    "font-size": isMobile ? "24px" : "30px",
    "font-weight": "bolder",
    /*"font-family": "NeutraTextBook",*/
    padding: "1px 8px 8px 0px",
  }
  /*
    const bt_wh_background =
    {
      "background-color": "#FFFFFF !important",
    }
  */
  const bt_wh_red_txt =
  {
    normal:
    {
      "text-decoration": "none",
      color: "#ED2024",
      "font-size": isMobile ? "1.6rem" : "2.0rem",
      "font-weight": "bolder",
      /*"font-family": "NeutraTextBook",*/
      padding: "1px 8px 8px 0px",
      /*padding: "1px 40px",*/
    },
    hover:
    {
      "text-decoration": "none",
      color: "#FFFFFF",
      "font-size": "30px",
      "font-weight": "bolder",
      /*"font-family": "NeutraTextBook",*/
      padding: "1px 8px 8px 0px",
      /*padding: "1px 40px",*/
    }
  }



  useEffect(() => {
    if (product) {
      //Pegante =========> const Glue = product.properties.find((pro) => pro.name === 'Id SKU Pegante')
      //Pegante =========> if (Glue && Glue.values.length > 0) {
      //Pegante =========>  setSkuGlue(Glue.values[0])
      //Pegante =========> }
      const FreeSample = product.properties.find((pro) => pro.name === 'Id Muestra')
      if (FreeSample && FreeSample.values.length > 0) {
        setSkuFreeSample(FreeSample.values[0])
      }

      const handleResize = () => { setIsMobile(window.innerWidth < MOBILE_BREAKPOINT); };
      window.addEventListener('resize', handleResize);
      //return () => window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResize);

      const unitM = selectedItem?.unitMultiplier
      if (typeof unitM === "number")
        setInputMetersRawFix2(1, unitM);
    }
  }, [product])

  const unitMultiplier = selectedItem?.unitMultiplier
  const Price = selectedItem?.sellers[0]?.commertialOffer.Price
  const taxPercentage = selectedItem?.sellers[0]?.commertialOffer.taxPercentage
  const Tax = selectedItem?.sellers[0]?.commertialOffer.Tax
  const sellingPriceWithTax = (Price && taxPercentage && taxPercentage !== 0 && Tax && unitMultiplier) ? Math.ceil(Price + (Tax / unitMultiplier)) : Price

  /*const measurementUnit = selectedItem?.measurementUnit*/

  const inputChange = (input: ChangeEvent<HTMLInputElement>) => {
    const { value } = input.target
    const inputNumber = validateInputNumber(value) ? parseInt(value) : value === '' ? 0 : inputMeters !== 0 ? inputMeters : 0

    setInputMeters(inputNumber)
    setCheckMore(false)
    if (unitMultiplier) {
      const boxCount = Math.ceil(inputNumber / unitMultiplier)
      setCantBox(boxCount)
      setInputMetersRawFix2(boxCount, unitMultiplier)
      //Pegante =========> const glue = Math.ceil(((boxCount * unitMultiplier) / unitMultiplierGlue))
      //Pegante =========> setCantGlue(glue)
    }

  }

  {/* ==================== Evento cambio de valor en edit de cajas =========================== */ }
  const inputChangeBox = (input: ChangeEvent<HTMLInputElement>) => {
    const { value } = input.target
    const inputNumber = validateInputNumber(value) ? parseInt(value) : value === '' ? 0 : cantBox !== 0 ? cantBox : 0
    setCantBox(inputNumber)
    setCheckMore(false)

    if (unitMultiplier) {
      const metersCount = Math.trunc(inputNumber * unitMultiplier)
      setInputMeters(metersCount)
      setInputMetersRawFix2(inputNumber, unitMultiplier);
    }
  }

  const OneBoxMinus = () => {
    setCheckMore(false)
    if (cantBox > 1) {
      setCantBox(cantBox - 1)
      if (unitMultiplier) {
        const metersCount = Math.trunc((cantBox - 1) * unitMultiplier)
        setInputMeters(metersCount)
        setInputMetersRawFix2((cantBox - 1), unitMultiplier);

      } //if
    } //if
  }

  const setInputMetersRawFix2 = (Boxs: number, unitMultiplier: number) => {
    let VarTemp = Boxs * unitMultiplier;
    const VarTemp2 = parseFloat(VarTemp.toFixed(1));
    setInputMetersRaw(VarTemp2);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }

  const OneBoxMore = () => {
    setCheckMore(false)
    setCantBox(cantBox + 1)
    if (unitMultiplier) {
      const metersCount = Math.trunc((cantBox + 1) * unitMultiplier)
      setInputMeters(metersCount)

      setInputMetersRawFix2((cantBox + 1), unitMultiplier);
    } //if
  }

  const OneMeterMinus = () => {
    if (inputMeters > 1) {
      setCheckMore(false)
      setInputMeters(inputMeters - 1)
      if (unitMultiplier) {
        const boxCount = Math.ceil((inputMeters - 1) / unitMultiplier)
        setCantBox(boxCount)
        setInputMetersRawFix2(boxCount, unitMultiplier);
      } //if
    } //if
  }

  const OneMeterMore = () => {
    setCheckMore(false)
    setInputMeters(inputMeters + 1)
    if (unitMultiplier) {
      const boxCount = Math.ceil((inputMeters + 1) / unitMultiplier)
      setCantBox(boxCount)

      setInputMetersRawFix2(boxCount, unitMultiplier);
    } //if
  }

  const inputChangeCalculator = (meters: number) => {

    const inputNumber = meters

    setInputMeters(inputNumber)
    setCheckMore(false)
    if (unitMultiplier) {
      const boxCount = Math.ceil(inputNumber / unitMultiplier)
      setCantBox(boxCount)
      //Pegante =========> const glue = Math.ceil(((boxCount * unitMultiplier) / unitMultiplierGlue))

      //Pegante =========> setCantGlue(glue)
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

      //Pegante =========> const glue = Math.ceil(((boxCount * unitMultiplier) / unitMultiplierGlue))
      //Pegante =========> setCantGlue(glue)
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
      //Pegante =========> const glue = Math.ceil(((boxCount * unitMultiplier) / unitMultiplierGlue))
      //Pegante =========> setCantGlue(glue)
    }

  }

  const checkMoreCant = () => {
    if (checkMore) {
      setInputMeters(beforeCheckInput)
      if (unitMultiplier) {
        const boxCount = Math.ceil(beforeCheckInput / unitMultiplier)
        setCantBox(boxCount)

        setInputMetersRawFix2(boxCount, unitMultiplier);

        //Pegante =========> const glue = Math.ceil(((boxCount * unitMultiplier) / unitMultiplierGlue))
        //Pegante =========> setCantGlue(glue)
      }
    } else {
      setBeforeCheckInput(inputMeters)
      const result = Math.ceil(inputMeters * 1.1)
      setInputMeters(result)
      if (unitMultiplier) {
        const boxCount = Math.ceil(result / unitMultiplier)
        setCantBox(boxCount)

        setInputMetersRawFix2(boxCount, unitMultiplier);

        //Pegante =========> const glue = Math.ceil(((boxCount * unitMultiplier) / unitMultiplierGlue))
        //Pegante =========> setCantGlue(glue)
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

    //Pegante =========>
    /*
    if (skuGlue !== '' && cantGlue > 0 && checkGlue)
    {
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

  // const buyFromWhatsapp = async () => {
  //   window.location.href = 'https://cutt.ly/cexPOtcZ';
  // }

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
      message: 'La muestra gratis se agregó al carrito',
      duration: 3000,
      horizontalPosition: 'left',
    })
  }

  return (
    <ToastConsumer>
      {({ showToast }: any) => (
        <div style={StyleContenedor}>

          <div style={StyleContenedorInterno}>

            <div style={ContenedorPriceUnit}>
              <span className={handles.txt_neutra_alt_bold} style={LabelValorMeterCaja}>{formatter.format((sellingPriceWithTax) ? Math.trunc(sellingPriceWithTax) : 0)} por M<sup>2</sup></span>
              <span style={StyleLabelValor2}>|</span>
              <span className={handles.txt_neutra_alt_bold} style={LabelValorMeterCaja}> {formatter.format((unitMultiplier && sellingPriceWithTax) ? Math.trunc(sellingPriceWithTax * unitMultiplier) : 0)} por Caja </span>
            </div>

            <div style={StyleContenedorLabelInfo}>
              <span className={handles.txt_neutra} style={StyleLabelInfo1}>Ingresa la cantidad de Metros o cajas que necesitas</span>
              <span className={handles.txt_neutra} style={StyleLabelInfo2} onClick={() => setShowCal(true)}> ¿Cómo calculo los M2? </span>
              <Modal show={showCal} setShow={setShowCal} >
                {/* <div className={handles.modal_open}> */}
                <div className={handles.title_area_quote}> <span>Cotiza tu Espacio</span> </div>

                <div className={handles.containercalc}>

                  <div className={handles.columncalc}>
                    <div className={handles.title_area_quote}><span>Piso</span></div>
                    <span className={handles.input_text}> Ingresa Ancho en metros </span>
                    <input className={handles.input} value={inputMetersAnchoPiso} onChange={inputChangeAnchoPiso} />
                    <span className={handles.input_text}> Ingresa Largo en metros </span>
                    <input className={handles.input} value={inputMetersLargoPiso} onChange={inputChangeLargoPiso} />
                    <span className={handles.input_text}> Total Piso m2 </span>
                    <input className={handles.input} value={inputMetersTotalPiso} onChange={inputChangeTotalPiso} />
                  </div>
                  <div className={handles.columncalc}>
                    <div className={handles.title_area_quote}><span>Pared</span></div>
                    <span className={handles.input_text}> Ingresa Ancho en metros </span>
                    <input className={handles.input} value={inputMetersAnchoPared} onChange={inputChangeAnchoPared} />
                    <span className={handles.input_text}> Ingresa Alto en metros </span>
                    <input className={handles.input} value={inputMetersAltoPared} onChange={inputChangeAltoPared} />
                    <span className={handles.input_text}> Total Pared m2 </span>
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

            <div style={ContentInputs}>

              <div style={ContentInputInt}>
                <div style={StyleContentInputcont}>
                  <span style={BtDirL} onClick={OneMeterMinus}>◀</span>
                  <input className={handles.txt_neutra} style={InputMeterBox} value={inputMeters} onChange={inputChange} />
                  <span style={BtDirR} onClick={OneMeterMore}>▶</span>
                </div>
                <span className={handles.txt_neutra} style={LabelInputs}>&nbsp;&nbsp;M<sup>2</sup></span>
              </div>

              <div style={ContentInputDiv}>|</div>

              <div style={ContentInputInt}>
                <div style={StyleContentInputcont}>
                  <span style={BtDirL} onClick={OneBoxMinus}>◀</span>
                  <input className={handles.txt_neutra} style={InputMeterBox} value={cantBox} onChange={inputChangeBox} />
                  <span style={BtDirR} onClick={OneBoxMore}>▶</span>
                </div>
                <span className={handles.txt_neutra} style={LabelInputs}>&nbsp; Cajas</span>
              </div>
            </div>

          </div>

          <div style={StyleInputRadio}>
            <label className={handles.radius_label}>
              <input type='radio' checked={checkMore} onClick={checkMoreCant} />
              &nbsp;
              <span className={handles.txt_neutra} style={StyleRadius_text}>Recomendamos agregar el 10% adicional</span>

              <span className={handles.txt_neutra} style={StyleLabelInfo2} onClick={() => setShowWhy(true)}>&nbsp;&nbsp;&nbsp;¿Por qué?</span>
              <Modal show={showWhy} setShow={setShowWhy} >
                <div className={handles.content_modal_why_open}>
                  <span className={handles.content_modal_why_open_text}>Recomendamos agregar 10% adicional para cubrir los desperdicios en la instalación</span>
                </div>
              </Modal>

            </label>
          </div>


          {/* ===============  Span pasarlo a input ===============  */}
          <div className={handles.txt_neutra} style={DivLblMeterTotal}> Metros totales: {inputMetersRaw} M<sup>2</sup> </div>
          <span className={handles.txt_neutra_alt_bold} style={DivLblPriceTotal}>Precio Total: &nbsp; {formatter.format((sellingPriceWithTax && unitMultiplier) ? Math.trunc((sellingPriceWithTax * unitMultiplier) * cantBox) : 0)} </span>


          {/* ================  Bloque de pegantes... Quitado por segunda vez Soporte #02.660.468 =======================
            =============================================================================================================
          }
          <div className={handles.box_additional}>
            {skuGlue !== '' && <GlueBySku sku={skuGlue} checkGlue={checkGlue} setCheckGlue={setCheckGlue} setUnitMultiplierGlue={setUnitMultiplierGlue}
              cantGlue={cantGlue} setCantGlue={setCantGlue} setMountGlue={setMountGlue} />}
          </div>
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
          { ================  Fin Bloque de pegantes...  ======================= */}

          <div className={handles.box_btn}>
            <div className={handles.btn_content}>
              {(!(skuFreeSample === '') || loadingFreeSample) &&
                <>
                  <div className={handles.btn_img_list}>
                    <button style={bt_wh_red.button} disabled={loading} onClick={() => addToCartAll(showToast)}>
                      {loading ?
                        <Spinner color="currentColor" size={30} /> :
                        <div className={handles.btn_add_content}><IcoCart4628 />
                          <span className={handles.txt_neutra_alt_bold} style={bt_wh_red_txt.normal}>Añadir al carrito!</span>
                        </div>
                      }
                    </button>
                  </div>
                  {/* =========================== Quitar Muestra Gratis 02.676.830 =================================================== */}
                  {((skuFreeSample === 'DGDFGDFGDFDFGDFG/&((678678')) &&
                    <div className="summarySmallDisclaimer">
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
                        {/* <div className={handles.container_price}>
                        <button className={handles.btn_buy_whatsapp} onClick={() => buyFromWhatsapp()}  >
                          <div className={handles.btn_add_content_whatsapp}>
                            <span className={handles.btn_add_text}>
                              <img className={handles.btn_img_whatsapp} src='https://ceramicaitalia.vtexassets.com/assets/vtex.file-manager-graphql/images/9ccc95d1-6540-43bd-b6c7-8a7ccbda6901___b900370a8d6bf4c1ce8ac67712888793.png' />
                              Compra por whatsapp<br />
                            </span>
                            <span className={handles.btn_add_text_whatsapp}>hablar con un asesor</span>
                          </div>
                        </button>
                      </div> */}
                      </div>
                    </div>
                  }
                </>
              }

              {((skuFreeSample === '')) &&

                <div className={handles.btn_img_list}>
                  <button className={handles.btn_free}
                    disabled={loading}
                    onClick={() => addToCartAll(showToast)}>
                    {loading ?
                      <Spinner color="currentColor" size={30} /> :
                      <div>
                        <IcoCart4628 />
                        <span className={handles.txt_neutra_alt_bold} style={bt_wh_red_text}>Añadir al carrito</span>
                      </div>
                    }
                  </button>
                </div>
              }

              <div className={handles.btn_img_list}>
                <img className={handles.btn_img} src='https://ceramicaitalia.vteximg.com.br/arquivos/pagosceramica1.png' />
              </div>


            </div>

          </div>
        </div>
      )}
    </ToastConsumer>
  )
}
