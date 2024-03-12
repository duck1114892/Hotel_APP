import React, { useState } from 'react';
import { Box, Center, Input, View } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderComponent = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        // Thực hiện xử lý tìm kiếm dựa trên giá trị searchValue
        console.log('Searching for:', searchValue);

        // Sau khi xử lý tìm kiếm, xóa giá trị trong Input
        setSearchValue('');
    };

    return (
        <Box backgroundColor="blue.300" height={100} style={{ display: 'flex', justifyContent: 'center' }}>
            <Center style={{ marginTop: "10%" }}>
                <Input
                    placeholder="Tìm Kiếm Khách Sạn"
                    InputLeftElement={<Ionicons style={{ paddingLeft: '5%' }} name="search" color="gray" size={20} />}
                    style={{ width: "40%" }}
                    borderRadius={20}
                    backgroundColor="white"
                    value={searchValue}
                    onChangeText={(text) => setSearchValue(text)}
                    onSubmitEditing={handleSearch}
                />
            </Center>
        </Box>
    );
};

export default HeaderComponent;
