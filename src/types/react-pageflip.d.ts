declare module "react-pageflip" {
  import { Component, ReactNode, CSSProperties } from "react";

  export interface PageFlipMethods {
    flipNext: () => void;
    flipPrev: () => void;
    flip: (pageNum: number) => void;
    getCurrentPageIndex: () => number;
    getPageCount: () => number;
  }

  export interface HTMLFlipBookProps {
    width: number;
    height: number;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    startPage?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
    onFlip?: (e: { data: number }) => void;
    onChangeState?: (e: { data: string }) => void;
  }

  export default class HTMLFlipBook extends Component<HTMLFlipBookProps> {
    pageFlip: () => PageFlipMethods;
  }
}