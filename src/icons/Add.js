import React from 'react'
import { Path } from 'glamorous'

import SvgWrapper from './SvgWrapper'

const Add = ({ css = {} }) => <SvgWrapper viewBox="0 0 24 24" css={css}>
  <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
</SvgWrapper>

export default Add