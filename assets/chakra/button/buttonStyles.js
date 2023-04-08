export const ButtonStyles = {
  variants: {
    primary: {
      bg: "#007ce6",
      shadow: "md",
      color: "#ffffff",
      _hover: {
        bg: "#006fcf",
        _disabled: {
          bg: "#007ce6",
        },
      },
      _active: {
        bg: "#0063ba",
        shadow: "md",
        _disabled: {
          shadow: "none",
        },
      },
      _disabled: {
        _hover: {
          bg: "#3c73bb",
        },
      },
    },
    outlined: {
      border: "1px solid #007ce6",
      color: "#007ce6",
      _hover: {
        bg: "#f1f8ff",
      },
      _active: {
        bg: "#e3f2ff",
        shadow: "sm",
      },
    },
    ghost: {
      color: "#007ce6",
      _hover: {
        bg: "#f1f8ff",
      },
      _active: {
        bg: "#e3f2ff",
      },
    },
    ghostCancel: {
      color: "#ff0000",
      _hover: {
        bg: "#ffe5e5",
      },
      _active: {
        bg: "#fee0e0",
        shadow: "sm",
      },
    },
    link: {
      color: "#007ce6",
      _hover: {
        decoration: "udnerline",
      },
      _active: {
        color: "#0063ba",
      },
    },
    _disabled: {
      color: "#006498",
      _hover: {
        color: "#006498",
      },
    },
  },
};
