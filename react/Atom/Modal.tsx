import React, { ReactNode } from 'react'
import { applyModifiers, useCssHandles } from "vtex.css-handles";
import { Overlay } from "vtex.react-portal";
import { IcoClose } from '../svg/Icos';
import { CSS_HANDLES } from '../constant';

interface Props {
    show:boolean
    children:ReactNode
    setShow:(show:boolean)=>void
}

export const Modal = ({show, children, setShow }:Props) => {
    const handles = useCssHandles(CSS_HANDLES)
  return (
    <Overlay>
        <div className={applyModifiers(handles.Modal__content, show?"show":"")}>
            <div className={applyModifiers(handles.Modal__content_modal, show?"show":"")}>
                <div className={handles.content_modal_content}>
                    <div className={handles.modal_content_close}>
                        <span className={handles.modal_close} onClick={()=>setShow(false)}>
                            <IcoClose/>
                        </span>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    </Overlay>
    
  )
}
