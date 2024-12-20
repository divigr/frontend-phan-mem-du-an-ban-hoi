// styles/breakpoints.js
import { css } from 'styled-components'

export const breakpoints = {
  desktop: 1920,
  smallDesktop: 1024,
  tablet: 768,
  mobile: 480,
}

export const media = {
  desktop: (styles) => css`
    @media (max-width: ${breakpoints.desktop}px) {
      ${styles}
    }
  `,
  smallDesktop: (styles) => css`
    @media (max-width: ${breakpoints.smallDesktop}px) {
      ${styles}
    }
  `,
  tablet: (styles) => css`
    @media (max-width: ${breakpoints.tablet}px) {
      ${styles}
    }
  `,
  mobile: (styles) => css`
    @media (max-width: ${breakpoints.mobile}px) {
      ${styles}
    }
  `,
}
