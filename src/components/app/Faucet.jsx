import React, {useState} from "react"
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import LinkIcon from '@mui/icons-material/Link';
import { truncateAddress } from "../../libs/utils";

const Faucet = ({icon, name, symbol, address, link}) => {
  const [copiedAddress, setCopiedAddress] = useState(false)

  const copyHandler = () => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true)

        const timer = setTimeout(() => {
                  setCopiedAddress(false)
        }, 2000);
  }


  return (
    <Grid item xs={12} md={6}>
      <Paper
        elevation={0}
        sx={{
          p: 0,
          py: 2,
          display: "flex",

        }}
      >
        <Box sx={{
            
            mr: 2,
            textAlign: "center",
        }}>
          <Box
            sx={{
              width: { xs: "45px", sm: "50px", md: "60px" },
              height: { xs: "45px", sm: "50px", md: "60px" },
              position: "relative",
              border: icon ? 0 : 1,
              borderColor: "rgba(0,0,0,0.24)",
              background: "rgba(0,0,0,0.05)",
              borderRadius: "50%",
            }}
          >
            {icon && (
              <Image src={icon} alt={name} fill={true} sizes="(max-width: 420px) 45px, (max-width: 768px) 50px,
              (max-width: 1200px) 60px,
              60px"/>
            )}
          </Box>
          <Typography>{symbol}</Typography>
        </Box>
            <Box sx={{
                
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                wordWrap: "break-word"
            }}>
                <Typography variant="h4" sx={{
                    fontSize: "1.125rem",
                    mb: 1,
                }}>
                    {name}
                </Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    
                    mb: 1,
                }}>
                {/* <Typography variant="body2" sx={{
                    display: {xs: "none", sm: "block"}
                }}>
                    Address: {address}
                </Typography> */}
                <Typography variant="body2" sx={{
                    // display: {xs: "block", sm: "none"}
                }}>
                    Address: {truncateAddress(address)}
                </Typography>
                    {copiedAddress ? <TaskAltOutlinedIcon sx={{
                    fontSize: "1rem",
                    mx: 2,
                }}/> :
                    <ContentCopyOutlinedIcon onClick={copyHandler} sx={{
                    fontSize: "1rem",
                    mx: 2,
                    cursor: "pointer"
                }} />}
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    
                    mb: 1,

                }}>
                {link && <Typography variant="body2" className="faucet-link" sx={{
                    "& a": {
                        color: "primary.main",
                        textDecoration: "none",
                    },
                    "& a:hover": {
                        textDecoration: "underline"
                    }
                    
                }}>
                    Faucet Link: <a href={link} rel="noreferrer" target="_blank">{link} </a>
                </Typography>}
                <LinkIcon className="faucet-link-icon" sx={{
                    fontSize: "1.25rem",
                    mr: 2,
                    ml: 1,
                }} />
                </Box>
                
            </Box>
        
      </Paper>
      <Divider />
    </Grid>
  );
};

export default Faucet;
