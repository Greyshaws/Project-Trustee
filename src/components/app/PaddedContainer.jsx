import { Container } from "@mui/material"
import styles from '../../../styles/App.module.css'

const PaddedContainer = ({children}) => {

    return (
        <Container className={styles.container} maxWidth="xl">
            {children}
        </Container>
    )
} 

export default PaddedContainer