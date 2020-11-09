import React from "react";

import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({ children, ...props }) => (
    <CustomButtonContainer className='custom-button'{...props} data-test='custom-button'>
        {children}
    </CustomButtonContainer>
);

export default CustomButton;
