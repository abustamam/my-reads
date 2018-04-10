import React from 'react'
import { Svg, Path } from 'glamorous'
import SvgWrapper from './SvgWrapper'

const ArrowDropDown = ({ css = {} }) => <SvgWrapper viewBox="0 0 24 24" css={css}>
  <Path d="M7 10l5 5 5-5z" />
</SvgWrapper>

export default ArrowDropDown