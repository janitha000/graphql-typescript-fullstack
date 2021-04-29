import { Box } from '@chakra-ui/layout';
import React from 'react'

interface WrapperProps {
    variant?: "regular" | "small"
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
    return (
        <Box w="100%" maxW={variant === 'regular' ? "800px" : "400px"} mt="20px" mx='auto'>{children}</Box>
    );
}