import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react'
import { BadgeDollarSign } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/authContexProvider';
import authServices from '../api/authServices';
import {useNavigate} from "react-router-dom"

export default function Nav() {
  const navigate = useNavigate()
  const {userInfo} = useContext(AuthContext)

  const handleLogout = async() => {
    try{
      const logRes = await authServices.logOut()
      // console.log("log res:", logRes);
      if(logRes?.success === true) {
        navigate("/login")
      }
    }catch(err){
      console.log("log out err:", err.message);
    }
  }

  return (
      <Box as='nav' bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <BadgeDollarSign size={37} color='teal'/>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'} name={`${userInfo?.[0]?.firstName} ${userInfo?.[0]?.lastName}`}
                    src='https://bit.ly/tioluwani-kolawole'
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                  <Avatar size={"2xl"} name={`${userInfo?.[0]?.firstName} ${userInfo?.[0]?.lastName}`} src='https://bit.ly/tioluwani-kolawole' />
                  </Center>
                  <br />
                  <Center>
                    <p>{userInfo?.[0]?.firstName} {userInfo?.[0]?.lastName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
  )
}