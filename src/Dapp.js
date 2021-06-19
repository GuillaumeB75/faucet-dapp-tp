import { useContext, useState, useEffect } from "react";
import { Web3Context } from "web3-hooks";
import { FaucetContext } from "./App";
import {
  Box,
  Center,
  Heading,
  Button,
  GridItem,
  Input,
  InputGroup,
  Text,
  Spacer,
  Image,
  HStack,
  SimpleGrid,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

function Dapp() {
  const [web3State, login] = useContext(Web3Context);
  const faucet = useContext(FaucetContext);
  const [erc20, setErc20] = useState(false);

  const [owner, setOwner] = useState("");
  const [decimals, setDecimals] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
   const [allowance, setAllowance] = useState("");

  const [balance, setBalance] = useState(null);
   const toast = useToast();

  const handleClickSendToken = async () => {
    try {
      console.log(balance);
      await faucet.sendToken();
      const tx = await faucet.balanceOf();
      setBalance(tx.toString());
      toast({
        title: 'Confirmed transaction',
        description: `You have received 100 SGSA`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      console.log(balance);
    } catch (e) {
      toast({
        title: 'Transaction refused, wait 3 days to ask more SGSA',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  };
  
  useEffect(() => {
    // si faucet est pas null alors
    if (faucet) {
      const cb = (account, amount, timeLapse) => {
        if (account.toLowerCase() === web3State.account.toLowerCase()) {
          console.log(`${account} bought ${amount}, at ${timeLapse}`);
                    toast({
                      title: "Event Bought",
                      description: `${account} bought ${amount}, at ${timeLapse}`,
                      status: "info",
                      position: "top-right",
                      duration: 9000,
                      isClosable: true,
                    });
        }
      };
      faucet.on("Bought", cb);
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        faucet.off("Bought", cb);
      };
    }
  }, [faucet, web3State.account]);
  
  const handleClickDecimals = async () => {
    try {
      const dec = await faucet.decimals();
      setDecimals(dec);
    } catch (e) {
      setDecimals("Error");
      console.log(e.message);
    }
  };
  const handleClickName = async () => {
    try {
      const nam = await faucet.name();
      setName(nam);
    } catch (e) {
      setName("Error");
      console.log(e.message);
    }
  };
  const handleClickOwner = async () => {
    try {
      const own = await faucet.owner();
      setOwner(own.toString());
    } catch (e) {
      setOwner("Error");
      console.log(e.message);
    }
  };
  const handleClickSymbol = async () => {
    try {
      const sym = await faucet.symbol();
      setSymbol(sym);
    } catch (e) {
      setSymbol("Error");
      console.log(e.message);
    }
  };
  const handleClickTotalSupply = async () => {
    try {
      const tot = await faucet.totalSupply();
      setTotalSupply(tot.toString());
    } catch (e) {
      setTotalSupply("Error");
      console.log(e.message);
    }
  };
    const handleClickAllowance = async () => {
      try {
        const all = await faucet.allowance();
        setAllowance(all);
      } catch (e) {
        setAllowance("Error");
        console.log(e.message);
      }
    };



  return (
    <>
      {!erc20 ? (
        <Box h="100vh" bg="#181818">
          <Center bg="salmon" h="10vh">
            <Spacer />
            <Image
              src="https://static.rfstat.com/renderforest/images/v2/logo-homepage/embleme_3.png"
              boxSize="100px"
              alt="SGSA"
            />
            <Spacer />
            <Heading color="white">SAGISTAMI FAUCET</Heading>
            <Spacer />
            <Button
              bg="#06bd92"
              color="#181818"
              onClick={() => setErc20(true)}
              pe={5}
            >
              Token
            </Button>
            <Spacer />
          </Center>
          <Spacer />

          <Center h="80vh">
            <HStack>
              <Box w="70%" h="50%" m={5} p={4}>
                <Text color="white" fontSize="6xl">
                  {" "}
                  Welcome to our Faucet
                </Text>
                <Text color="white" fontSize="2xl">
                  To buy 100 SGSA click on "SendToken" !
                </Text>
                <Button bg="#3399FF" m={5} onClick={handleClickSendToken}>
                  sendToken
                </Button>
              </Box>
              <Image src="https://static.rfstat.com/renderforest/images/v2/logo-homepage/embleme_3.png" />
            </HStack>
          </Center>
          <Center pos="relative" bg="salmon" h="10vh">
            <Text color="white" as="samp">
              🦏 Made by Sarah Marques, Guillaume Bézie, Stella Soler and Amine
              Benmissi 🦏
            </Text>
          </Center>
        </Box>
      ) : (
        <Box h="100vh" bg="#181818">
          <Center bg="salmon" h="10vh">
            <Spacer />
            <Image
              src="https://static.rfstat.com/renderforest/images/v2/logo-homepage/embleme_3.png"
              boxSize="100px"
              alt="SGSA"
            />
            <Spacer />
            <Heading color="white">SAGISTAMI FAUCET</Heading>
            <Spacer />
            <Button
              bg="#06bd92"
              color="#181818"
              onClick={() => setErc20(false)}
              pe={5}
            >
              Faucet
            </Button>
            <Spacer />
          </Center>
          <Center h="80vh">
            <SimpleGrid column={2} spacing={10}>
              <GridItem bg="lightGrey" p={5} rounded="md" me={6}>
                <p>MetaMask installed: {web3State.isMetaMask ? "✔️" : "✖️"}</p>
                <p>Web3: {web3State.isWeb3 ? "✔️" : "no-injected"}</p>
                <p>logged: {web3State.isLogged ? "✔️" : "✖️"}</p>
                {!web3State.isLogged && (
                  <>
                    <button onClick={login}>login</button>
                  </>
                )}
                <p>Network id: {web3State.chainId}</p>
                <p>Network name: {web3State.networkName}</p>
                <p>account: {web3State.account}</p>
                <p>Balance: {web3State.balance}</p>
              </GridItem>

              <Box>
                <Text
                  color="#181818"
                  rounded="full"
                  bg="lightGrey"
                  p={2}
                  as="samp"
                  w="22rem"
                >
                  Balance of SGSA : {balance}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid column={2} spacing={11}>
              <HStack spacing="2rem">
                <Box ms={7}>
                  <InputGroup w="9rem">
                    <Input
                      type="text"
                      id="decimals"
                      placeholder={decimals}
                      isDisabled
                    />
                    <InputRightElement children="spender" width="4.5rem">
                      <Button
                        bg="#3399FF"
                        h="2.5rem"
                        size="ml"
                        p={2}
                        children="decimals"
                        onClick={handleClickDecimals}
                        fontSize="sm"
                      >
                        view decimals
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Box w="9rem" p={3}>
                  <InputGroup w="12rem">
                    <Input
                      type="text"
                      w="9rem"
                      id="name"
                      placeholder={name}
                      isDisabled
                    />

                    <InputRightElement children="name" width="4.5rem">
                      <Button
                        bg="#3399FF"
                        h="2.5rem"
                        size="ml"
                        p={2}
                        children="decimals"
                        onClick={handleClickName}
                        fontSize="sm"
                      >
                        view name
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Box p="2rem">
                  <InputGroup w="12rem" ps={7}>
                    <Input
                      type="text"
                      id="ssymbol"
                      placeholder={symbol}
                      isDisabled
                    />
                    <InputRightElement children="symbol" width="4.5rem">
                      <Button
                        bg="#3399FF"
                        h="2.5rem"
                        size="ml"
                        p={2}
                        children="decimals"
                        onClick={handleClickSymbol}
                        fontSize="sm"
                      >
                        view symbol
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </HStack>
              <Box w="19rem">
                <InputGroup w="33rem" ps={7}>
                  <Input
                    type="text"
                    id="owner"
                    placeholder={owner}
                    isDisabled
                  />
                  <InputRightElement children="owner" width="4.5rem">
                    <Button
                      bg="#3399FF"
                      h="2.5rem"
                      size="ml"
                      p={2}
                      children="owner"
                      onClick={handleClickOwner}
                      fontSize="sm"
                    >
                      view owner
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box w="22rem">
                <InputGroup w="22rem" ps={7}>
                  <Input
                    type="text"
                    id="totalSupply"
                    placeholder={totalSupply}
                    isDisabled
                  />
                  <InputRightElement children="totalSupply" width="4.5rem">
                    <Button
                      bg="#3399FF"
                      h="2.5rem"
                      size="ml"
                      p={2}
                      children="totalSupply"
                      onClick={handleClickTotalSupply}
                      fontSize="sm"
                    >
                      view total supply
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box w="22rem">
                <InputGroup w="22rem" ps={7}>
                  <Input
                    type="text"
                    id="allowanxe"
                    placeholder={allowance}
                    isDisabled
                  />
                  <InputRightElement children="allowance" width="4.5rem">
                    <Button
                      bg="#3399FF"
                      h="2.5rem"
                      size="ml"
                      p={2}
                      children="totalSupply"
                      onClick={handleClickAllowance}
                      fontSize="sm"
                    >
                      view allowance
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </SimpleGrid>
          </Center>
          <Center pos="relative" bg="salmon" h="10vh">
            <Text color="white" as="samp">
              🦏 Made by Sarah Marques, Guillaume Bézie, Stella Soler and Amine
              Benmissi 🦏
            </Text>
          </Center>
        </Box>
      )}
    </>
  );
}

export default Dapp;