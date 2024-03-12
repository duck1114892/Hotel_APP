import React, { useState } from 'react';
import { Box, Center, Input, Text, View } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import exampleData from '../example data/data';
const HeaderComponent = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        // Thực hiện xử lý tìm kiếm dựa trên giá trị searchValue
        console.log('Searching for:', searchValue);

        // Sau khi xử lý tìm kiếm, xóa giá trị trong Input
        setSearchValue('');
    };

    return (
        <Box height={10} style={{ display: 'flex', alignItems: 'center' }}>

        </Box>
    );
};

export default HeaderComponent;
