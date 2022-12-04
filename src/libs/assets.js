import usdtIcon from "../../public/assets/usdt.png"
import usdcIcon from "../../public/assets/usdc.png"

export const mumbai = [
    {
        name: "USD Coin",
        symbol: "USDC",
        address: "0xe11a86849d99f524cac3e7a0ec1241828e332c62",
        faucet: '',
        icon: usdcIcon,
        link: "https://calibration-faucet.filswan.com/#/dashboard",
    },
    {
        name: "USD Tether",
        symbol: "USDT",
        address: "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832",
        faucet: '',
        icon: usdtIcon,
        link: "https://calibration-faucet.filswan.com/#/dashboard",
    },
    {
        name: "@Joshuajee",
        symbol: "JEE",
        address: "0x35edF23bD48BF0ffbD18f57a71e4b29Ec838fA44",
        faucet: true,
        icon: '',
        link: ''
    },
    {
        name: "@Gracious",
        symbol: "GREY",
        address: "0xb0CC13c12985F6195a3591740393c5E72ED80DA4",
        faucet: true,
        icon: '',
        link: ''
    },
    {
        name: "@Precious",
        symbol: "PRESH",
        address: "0x1C1dF749c11A7a9739B2Ac7C68Ba19fCC2859e57",
        faucet: true,
        icon: '',
        link: ''
    },
    {
        name: "@Devine",
        symbol: "DVN",
        address: "0xf0Df94386f7fFF361bE70bCF6A9D401dfa368079",
        faucet: true,
        icon: '',
        link: ''
    }
]






export const mapToSymbol = {
    "0xe11a86849d99f524cac3e7a0ec1241828e332c62": "USDC",
    "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832": "USDT",
    "0x35edF23bD48BF0ffbD18f57a71e4b29Ec838fA44": "JEE",
    "0xb0CC13c12985F6195a3591740393c5E72ED80DA4": "GREY",
    "0x1C1dF749c11A7a9739B2Ac7C68Ba19fCC2859e57": "PRESH",
    "0xf0Df94386f7fFF361bE70bCF6A9D401dfa368079":  "DVN"
}

