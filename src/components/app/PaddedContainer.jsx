import { Container } from "@mui/material"
import styles from '../../../styles/App.module.css'

const PaddedContainer = (props) => {

    return (
        <div {...props}>
            <Container className={styles.container} maxWidth="xl">
                {props.children}
            </Container>
        </div>
    )
} 

export default PaddedContainer