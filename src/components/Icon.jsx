import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

// FontAwesome init
library.add(
    faChevronRight,
)

export const Icon = ({ icon, size, color }) => <FontAwesomeIcon icon={icon} style={{ fontSize: size, color }} />