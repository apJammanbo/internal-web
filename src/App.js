import { Text, Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const App = () => {
  const [playing, setPlaying] = useState(false);

  const togglePlay = (isPlay) => {
    if (isPlay) {
      setPlaying(true);
      if (window.api) {
        window.api.sendMessage("play");
      }
    } else {
      setPlaying(false);
      if (window.api) {
        window.api.sendMessage("stop");
      }
    }
  };

  useEffect(() => {
    if (window.api) {
      window.api.onMessage((event, message) => {
        if (message === "play") {
          setPlaying(true);
        } else if (message === "stop") {
          setPlaying(false);
        }
      });
    }
  }, []);

  return (
    <Box
      w="100vw"
      h="100vh"
      bg="blue.300"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Text fontSize="6xl">Here is Web</Text>
      <Button colorScheme="orange" onClick={() => togglePlay(!playing)}>
        {playing ? "Stop" : "Play"}
      </Button>
      <Text>{playing ? "Playing..." : "Stoped"}</Text>
    </Box>
  );
};

export default App;
