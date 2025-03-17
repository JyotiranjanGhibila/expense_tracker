import { useToast } from "@chakra-ui/react";

const useToaster = () => {
  const toast = useToast();

  // Define color schemes based on status
  const getColorScheme = (status) => {
    switch (status) {
      case "success":
        return { bg: "green.500", color: "white" };
      case "error":
        return { bg: "red.500", color: "white" };
      case "warning":
        return { bg: "yellow.400", color: "black" };
      case "info":
      default:
        return { bg: "blue.500", color: "white" };
    }
  };

  const showToast = ({ title = "Notification", description = "", status = "info", duration = 5000 }) => {
    const { bg, color } = getColorScheme(status);
    
    toast({
      title,
      description,
      status,
      duration,
      isClosable: true,
      variant: "solid",
      containerStyle: { backgroundColor: bg, color },
    });
  };

  return showToast;
};

export default useToaster;
